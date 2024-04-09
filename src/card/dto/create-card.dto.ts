
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  flashSales: string;
  @IsString()
  title: string;
  @IsString()
  logo: string;
  @IsString()
  @IsArray({ each: true })
  prices: string[];
  @IsNumber()
  star: number;

}

//! id: string
//! flashSales: string
//! title: string
//! logo: string
//! prices: string[]
//! star: string
//! comments: number
