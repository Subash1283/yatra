import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { PlaceService } from './places.service';
import { CreatePlaceDto } from './dto/createPlaces.dto';
import { UpdatePlaceDto } from './dto/updatePlaces.dto';

import { JwtAuthGuard } from 'src/module/common/guards/jwt-authguard';
import { RoleGuard } from 'src/module/common/guards/role.guard';
import { Roles } from 'src/module/common/decorators/role.decorator';
import { Role } from 'src/users/role.enum';

// ✅ Swagger imports
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Places') // group name in swagger
@ApiBearerAuth() // 🔐 for JWT auth
@Controller('places')
@UseGuards(JwtAuthGuard, RoleGuard)
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  // ✅ CREATE
  @Post('insert')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new place (ADMIN only)' })
  @ApiResponse({ status: 201, description: 'Place created successfully' })
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  // ✅ GET ALL
  @Get()
  @ApiOperation({ summary: 'Get all places with optional filters' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  findAll(
    @Query('city') city?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.placeService.findAll({
      city,
      category,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  // ✅ GET ONE
  @Get(':id')
  @ApiOperation({ summary: 'Get a single place by ID' })
  @ApiParam({ name: 'id', description: 'Place ID' })
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(id);
  }

  // ✅ UPDATE
  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update place (ADMIN only)' })
  @ApiParam({ name: 'id', description: 'Place ID' })
  update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placeService.update(id, updatePlaceDto);
  }

  // ✅ DELETE
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete place (ADMIN only)' })
  @ApiParam({ name: 'id', description: 'Place ID' })
  remove(@Param('id') id: string) {
    return this.placeService.remove(id);
  }
}