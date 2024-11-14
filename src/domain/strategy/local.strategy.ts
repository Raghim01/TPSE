import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { DocService } from '../services/doc.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private docService: DocService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    return await this.docService.validateUser(email, password);
  }
}
