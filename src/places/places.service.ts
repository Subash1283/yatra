import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Place } from './places.entity';
import { CreatePlaceDto } from './dto/createPlaces.dto';
import { UpdatePlaceDto } from './dto/updatePlaces.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  // ✅ Create Place
  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placeRepository.create(createPlaceDto);
    return await this.placeRepository.save(place);
  }

  // ✅ Get All Places (with optional filters)
  async findAll(query?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    city?: string;
  }): Promise<Place[]> {
    const qb = this.placeRepository.createQueryBuilder('place');

    if (query?.city) {
      qb.andWhere('place.city = :city', { city: query.city });
    }

    if (query?.category) {
      qb.andWhere('place.categories LIKE :category', {
        category: `%${query.category}%`,
      });
    }

    if (query?.minPrice) {
      qb.andWhere('place.priceLevel >= :minPrice', {
        minPrice: query.minPrice,
      });
    }

    if (query?.maxPrice) {
      qb.andWhere('place.priceLevel <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    return await qb.getMany();
  }

  // ✅ Get One Place
  async findOne(id: string): Promise<Place> {
    const place = await this.placeRepository.findOne({ where: { id } });

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    return place;
  }

  // ✅ Update Place
  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.findOne(id);

    Object.assign(place, updatePlaceDto);

    return await this.placeRepository.save(place);
  }

  // ✅ Delete Place
  async remove(id: string): Promise<{ message: string }> {
    const place = await this.findOne(id);

    await this.placeRepository.remove(place);

    return { message: 'Place deleted successfully' };
  }
}