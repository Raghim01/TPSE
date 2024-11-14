import { ApiProperty } from '@nestjs/swagger';
import { SpecializationType } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class SignUpDocDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  surname!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty({ enum: SpecializationType })
  @IsEnum(SpecializationType)
  specialization!: SpecializationType;
}
