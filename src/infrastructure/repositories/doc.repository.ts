import { Injectable } from '@nestjs/common';
import { Doc } from '@prisma/client';
import { SignUpDocDto } from 'src/application/dtos/doc/register.dto';
import { UpdateDocDto } from 'src/application/dtos/doc/update.dto';
import { PrismaService } from 'src/domain/services/prisma.service';

@Injectable()
export class DocRepository {
  constructor(private prismaService: PrismaService) {}

  async createDoc(body: SignUpDocDto): Promise<Doc> {
    const newDoc = await this.prismaService.doc.create({
      data: {
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: body.password,
        specialization: body.specialization,
      },
    });

    return newDoc;
  }

  async findAll(): Promise<Doc[]> {
    const docs = await this.prismaService.doc.findMany();
    return docs;
  }

  async findByEmail(email: string) {
    const doc = await this.prismaService.doc.findUnique({
      where: { email },
    });

    return doc;
  }
  async findOne(id: number): Promise<Doc | null> {
    const doc = await this.prismaService.doc.findUnique({
      where: { id },
    });

    return doc;
  }

  async update(id: number, body: UpdateDocDto): Promise<Doc> {
    const updatedDoc = await this.prismaService.doc.update({
      where: { id },
      data: body,
    });

    return updatedDoc;
  }
}
