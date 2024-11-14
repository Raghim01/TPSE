import { Module } from '@nestjs/common';
import { DocService } from '../services/doc.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { Session } from '../strategy/serializer';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [DocService, LocalStrategy, Session],
  exports: [DocService],
})
export class DocModule {}
