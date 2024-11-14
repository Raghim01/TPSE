import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePatientDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  idnp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;
}
