import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/domain/modules/prisma.module';
import { DiagnosticRepository } from '../repositories/diagnostic.repository';
import { DocRepository } from '../repositories/doc.repository';
import { PatientRepository } from '../repositories/patient.repository';
import { DocModule } from 'src/domain/modules/doc.module';
import { PatientModule } from 'src/domain/modules/patient.module';
import { DiagnosticModule } from 'src/domain/modules/diagnostic.module';

@Module({
  imports: [PrismaModule, DocModule, PatientModule, DiagnosticModule],
  providers: [DiagnosticRepository, DocRepository, PatientRepository],
  exports: [DiagnosticRepository, DocRepository, PatientRepository],
})
export class AppModule {}
