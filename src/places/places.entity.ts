import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsInt, Min, Max } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 100 })
  city!: string;

  @Column({ length: 100 })
  country!: string;

@Type(() => Number)
@IsNumber()
latitude: number;

@Type(() => Number)
@IsNumber()
longitude: number;


  @Column({ nullable: true })
  imageUrl?: string;

  // 🎥 Short video (nullable)
  @Column({ nullable: true })
  videoUrl?: string;

  // 🏷️ Categories (multiple allowed)
  @Column('simple-array', { nullable: true })
  categories?: string[];
  // Example: ["beach", "adventure", "temple"]
  
@IsOptional()
@Type(() => Number)
@IsInt()
@Min(1)
@Max(5)
priceLevel?: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'float', default: 0 })
  rating!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}