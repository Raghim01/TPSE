import { Module } from '@nestjs/common';
import { DiagnosticService } from '../services/diagnostic.service';
import { DiagnosticController } from 'src/application/controllers/diagnostic.controller';
import {
  DiagnosticRepository,
  PatientRepository,
} from 'src/infrastructure/repositories';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [],
  exports: [DiagnosticService],
  controllers: [DiagnosticController],
  providers: [
    DiagnosticService,
    DiagnosticRepository,
    PatientRepository,
    PrismaService,
  ],
})
export class DiagnosticModule {}
