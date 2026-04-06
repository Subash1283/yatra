import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Place } from './places.entity';
import { PlaceService } from './places.service';
import { PlaceController } from './places.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [PlaceService], // ✅ only service (optional)
})
export class PlaceModule {}