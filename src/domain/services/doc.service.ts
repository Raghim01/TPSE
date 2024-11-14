import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DocRepository } from 'src/infrastructure/repositories';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { SignUpDocDto } from 'src/application/dtos';
import { hash } from 'bcrypt';

@Injectable()
export class DocService {
  constructor(
    private prismaService: PrismaService,
    private docRepository: DocRepository,
  ) {}

  async signUp(body: SignUpDocDto, req: Request) {
    const { password, email } = body;

    const isExists = await this.docRepository.findByEmail(email);

    if (isExists) {
      throw new BadRequestException('Email already exists!');
    }

    const hashedPassword = await this.hashPassword(password);

    const doc = await this.docRepository.createDoc({
      password: hashedPassword,
      ...body,
    });

    await new Promise<any>((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) {
          return reject(new BadRequestException('Cannot perform operation!'));
        }

        (req as any).login(doc, async (err) => {
          if (err) {
            return reject(new BadRequestException('Cannot perform operation!'));
          }

          resolve(doc);
        });
      });
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.docRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Doc not found'!);
    }
    const passwordMatch: boolean = await this.passworMatch(
      password,
      user.password,
    );

    if (!passwordMatch) throw new NotFoundException('Invalid credentials');

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async login(): Promise<any> {
    return {
      message: 'Login successful',
      statusCode: HttpStatus.OK,
    };
  }

  async logout(@Req() request: Request): Promise<any> {
    request.session.destroy(() => {
      return {
        message: 'Logout successful',
        statusCode: HttpStatus.OK,
      };
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }
}
