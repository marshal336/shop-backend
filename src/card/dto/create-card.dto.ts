
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    default: '-40%'
  })
  @IsString()
  flashSales: string;
  @ApiProperty({
    default: 'HAVIT HV-G92 Gamepad'
  })
  @IsString()
  title: string;
  @ApiProperty({
    default: 'https://i.postimg.cc/6Qxmr1ZT/gamepad.png'
  })
  @IsString()
  logo: string;
  @ApiProperty({
    default: ["$120", "$160"],
  })
  @IsString()
  @IsArray({ each: true })
  prices: string[];
  @IsNumber()
  @ApiProperty({
    default: 3
  })
  star: number;

}

//! id: string
//! flashSales: string
//! title: string
//! logo: string
//! prices: string[]
//! star: string
//! comments: number
