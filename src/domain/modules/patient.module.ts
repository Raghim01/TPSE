import { Module } from '@nestjs/common';
import { PatientSevice } from '../services/patient.service';
import { PatientController } from 'src/application/controllers/patient.controller';
import { PrismaService } from '../services/prisma.service';
import { PatientRepository } from 'src/infrastructure/repositories';

@Module({
  imports: [],
  exports: [],
  controllers: [PatientController],
  providers: [PatientSevice, PatientRepository, PrismaService],
})
export class PatientModule {}
