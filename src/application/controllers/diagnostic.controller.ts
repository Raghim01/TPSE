import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDiagnosticDto } from '../dtos';
import { DiagnosticService } from 'src/domain/services/diagnostic.service';

@ApiTags('Diagnostic APIs')
@Controller('diagnostics')
export class DiagnosticController {
  constructor(private readonly diagnosticSvc: DiagnosticService) {}

  @Post('')
  signUp(@Body() body: CreateDiagnosticDto) {
    return this.diagnosticSvc.createPatientDiagnostic(body);
  }

  @Get('')
  getAll(@Param('patientId') patientId: number) {
    return this.diagnosticSvc.getPatientDiagnostics(patientId);
  }

  @Get('/:diagnosticId')
  getPatients(@Param('diagnosticId') diagnosticId: number) {
    return this.diagnosticSvc.getPatientsByDiagnosticId(diagnosticId);
  }
}
