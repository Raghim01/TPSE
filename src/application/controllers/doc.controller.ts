import { Body, Controller, Post, Req } from '@nestjs/common';
import { DocService } from 'src/domain/services/doc.service';
import { SignUpDocDto } from '../dtos';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Doc APIs')
@Controller('docs')
export class DocController {
  constructor(private readonly docSvc: DocService) {}

  @Post('')
  signUp(@Body() body: SignUpDocDto, @Req() req: Request) {
    return this.docSvc.signUp(body, req);
  }
}
