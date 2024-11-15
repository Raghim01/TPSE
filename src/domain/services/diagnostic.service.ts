import { Injectable, NotFoundException } from '@nestjs/common';
import * as dtos from '../.././application/dtos/index';
import {
  DiagnosticRepository,
  PatientRepository,
} from 'src/infrastructure/repositories';
import { Diagnostic, Patient } from '@prisma/client';

@Injectable()
export class DiagnosticService {
  constructor(
    private patientRepository: PatientRepository,
    private diagnosticRepository: DiagnosticRepository,
  ) {}

  async getPatientDiagnostics(patientId: number): Promise<Diagnostic[]> {
    const patient = await this.patientRepository.getById(patientId);

    if (!patient) {
      throw new NotFoundException('Patient not found!');
    }

    const diagnostics =
      await this.diagnosticRepository.findAllByPatientId(patientId);

    return diagnostics;
  }

  async getPatientsByDiagnosticId(diagnosticId: number): Promise<Patient[]> {
    const diagnostic = await this.diagnosticRepository.findById(diagnosticId);

    if (!diagnostic) {
      throw new NotFoundException('Diagnostic not found!');
    }

    const patient = await this.patientRepository.getAllByDiagnostic(
      diagnostic.id,
    );

    return patient;
  }

  async createPatientDiagnostic(
    body: dtos.CreateDiagnosticDto,
  ): Promise<Diagnostic> {
    const patient = await this.patientRepository.getById(body.patientId);

    if (!patient) {
      throw new NotFoundException('Patient not found!');
    }

    const newDiagnostic = await this.diagnosticRepository.create({ ...body });

    return newDiagnostic;
  }

  async updatePatientDiagnostic(
    diagnosticId: number,
    body: dtos.UpdateDiagnosticDto,
  ): Promise<Diagnostic> {
    const diagnostic = await this.diagnosticRepository.findById(diagnosticId);

    if (!diagnostic) {
      throw new NotFoundException('Diagnostic not found!');
    }

    await this.diagnosticRepository.update(diagnosticId, body);

    return diagnostic;
  }

  async deletePatientDiagnostic(id: number): Promise<{ deleted: true }> {
    const diagnostic = await this.diagnosticRepository.findById(id);

    if (!diagnostic) {
      throw new NotFoundException('Diagnostic not found!');
    }

    await this.diagnosticRepository.delete(id);

    return { deleted: true };
  }
}
