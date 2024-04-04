import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'test@test.com',
  })
  email: string;

  @IsString()
  @MinLength(4, { message: 'password must be a 4 characters' })
  @ApiProperty({
    example: '123456',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '',
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '',
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '',
  })
  address?: string;
}
