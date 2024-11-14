import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty()
  @IsString()
  idnp!: string;

  @ApiProperty()
  @IsString()
  fullName!: string;
}
