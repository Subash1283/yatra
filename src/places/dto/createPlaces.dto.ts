import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsInt,
  Min,
  Max,
  IsUrl,
} from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  city!: string;

  @IsString()
  country!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  priceLevel?: number;
}