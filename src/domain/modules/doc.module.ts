import { Module } from '@nestjs/common';
import { DocService } from '../services/doc.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { Session } from '../strategy/serializer';
import { DocRepository } from 'src/infrastructure/repositories';
import { PrismaService } from '../services/prisma.service';
import { DocController } from 'src/application/controllers/doc.controller';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [DocService, LocalStrategy, Session, DocRepository, PrismaService],
  controllers: [DocController],
  exports: [DocService],
})
export class DocModule {}
