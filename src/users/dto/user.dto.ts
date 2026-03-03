import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../role.enum';

export class RegisterUserDto {
  @ApiProperty({
    example: 'Subas Shrestha',
    description: 'Full name of the user',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 'Kathmandu, Nepal',
    description: 'User address',
  })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;   // ✅ Added address

  @ApiProperty({
    example: 'subas@gmail.com',
    description: 'Valid email address',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password (minimum 6 characters)',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiPropertyOptional({
    enum: Role,
    example: Role.USER,
    description: 'User role (optional)',
  })
  @IsOptional()
  @IsEnum(Role, { message: 'Invalid role value' })
  role?: Role;
}