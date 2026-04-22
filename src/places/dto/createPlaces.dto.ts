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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlaceDto {

  @ApiProperty({ example: 'Pashupatinath Temple' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Famous Hindu temple in Kathmandu' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Kathmandu' })
  @IsString()
  city!: string;

  @ApiProperty({ example: 'Nepal' })
  @IsString()
  country!: string;

  @ApiProperty({ example: 27.7103 })
  @IsNumber()
  latitude!: number;

  @ApiProperty({ example: 85.3488 })
  @IsNumber()
  longitude!: number;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/video.mp4' })
  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ApiPropertyOptional({
    example: ['temple', 'heritage', 'religious'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiPropertyOptional({
    example: 3,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  priceLevel?: number;
}