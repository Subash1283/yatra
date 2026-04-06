import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './createPlaces.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}