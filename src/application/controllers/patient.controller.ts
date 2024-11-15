import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatientSevice } from 'src/domain/services/patient.service';
import { CreatePatientDto } from '../dtos';

@ApiTags('Patient APIs')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientSvc: PatientSevice) {}

  @Post('')
  create(@Body() body: CreatePatientDto) {
    return this.patientSvc.createPatient(body);
  }

  @Get('')
  getAll() {
    return this.patientSvc.getPatients();
  }
}
