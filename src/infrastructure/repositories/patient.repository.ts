import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { CreatePatientDto } from 'src/application/dtos/patient/create.dto';
import { UpdatePatientDto } from 'src/application/dtos/patient/update.dto';
import { PrismaService } from 'src/domain/services/prisma.service';

@Injectable()
export class PatientRepository {
  constructor(private prismaService: PrismaService) {}

  async create(body: CreatePatientDto) {
    const newPatient = await this.prismaService.patient.create({
      data: body,
    });

    return newPatient;
  }

  async getAll() {
    const patients = await this.prismaService.patient.findMany();

    return patients;
  }

  async getAllByDiagnostic(diagnosticId: number): Promise<Patient[]> {
    const patients = await this.prismaService.patient.findMany({
      where: {
        diagnostics: {
          some: {
            id: diagnosticId,
          },
        },
      },
    });

    return patients;
  }

  async getById(id: number) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id },
    });

    return patient;
  }

  async getAllDiagnostics(patientId: number) {
    const diagnostics = await this.prismaService.diagnostic.findMany({
      where: { patientId },
      include: {
        patient: true,
      },
    });

    return diagnostics;
  }

  async update(id: number, body: UpdatePatientDto) {
    const updatedPatient = await this.prismaService.patient.update({
      where: { id },
      data: body,
    });

    return updatedPatient;
  }
  async delete(id: number) {
    await this.prismaService.patient.delete({
      where: { id },
    });

    return { deleted: true };
  }
}
