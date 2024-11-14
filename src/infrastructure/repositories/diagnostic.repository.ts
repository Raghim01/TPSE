import { Injectable } from '@nestjs/common';
import { Diagnostic } from '@prisma/client';
import { CreateDiagnosticDto } from 'src/application/dtos/diagnostic/create.dto';
import { UpdateDiagnosticDto } from 'src/application/dtos/diagnostic/update.dto';
import { PrismaService } from 'src/domain/services/prisma.service';

@Injectable()
export class DiagnosticRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    patientId: number,
    body: CreateDiagnosticDto,
  ): Promise<Diagnostic> {
    const newDiagnostic = await this.prismaService.diagnostic.create({
      data: { patientId, ...body },
    });

    return newDiagnostic;
  }

  async findAllByPatientId(patientId: number): Promise<Diagnostic[]> {
    const diagnostics = await this.prismaService.diagnostic.findMany({
      where: { patientId },
    });

    return diagnostics;
  }

  async findById(id: number): Promise<Diagnostic | null> {
    const diagnostic = await this.prismaService.diagnostic.findUnique({
      where: { id },
    });

    return diagnostic;
  }

  async update(id: number, body: UpdateDiagnosticDto): Promise<Diagnostic> {
    const updatedDiagnostic = await this.prismaService.diagnostic.update({
      where: { id },
      data: body,
    });

    return updatedDiagnostic;
  }

  async delete(id: number) {
    await this.prismaService.diagnostic.delete({
      where: { id },
    });

    return { deleted: true };
  }
}
