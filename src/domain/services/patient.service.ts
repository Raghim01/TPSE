import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as dtos from '../.././application/dtos/index';
import { PatientRepository } from 'src/infrastructure/repositories';
import { Patient } from '@prisma/client';

@Injectable()
export class PatientSevice {
  constructor(
    private prismaService: PrismaService,
    private patientRepository: PatientRepository,
  ) {}

  async createPatient(body: dtos.CreatePatientDto): Promise<Patient> {
    const existingPatient = await this.prismaService.patient.findUnique({
      where: { idnp: body.idnp },
    });

    if (existingPatient) {
      throw new BadRequestException('Patient already exists!');
    }

    return this.patientRepository.create(body);
  }

  async getPatients(): Promise<Patient[]> {
    return this.patientRepository.getAll();
  }

  async getPatientById(id: number): Promise<Patient> {
    const patient = await this.patientRepository.getById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found!');
    }

    return patient;
  }

  async updatePatient(
    id: number,
    body: dtos.UpdatePatientDto,
  ): Promise<Patient> {
    const patient = await this.patientRepository.getById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found!');
    }

    return this.patientRepository.update(id, body);
  }

  async deletePatient(id: number): Promise<{ deleted: true }> {
    const patient = await this.patientRepository.getById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found!');
    }

    await this.patientRepository.delete(id);

    return { deleted: true };
  }
}
