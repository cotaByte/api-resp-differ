import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../database/entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
  ) {}

  create(dto: CreateCollectionDto): Promise<Collection> {
    const collection = this.collectionsRepository.create(dto);
    return this.collectionsRepository.save(collection);
  }

  findAll(): Promise<Collection[]> {
    return this.collectionsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Collection> {
    const collection = await this.collectionsRepository.findOneBy({ id });
    if (!collection) {
      throw new NotFoundException(`Collection ${id} not found`);
    }
    return collection;
  }

  async update(id: string, dto: UpdateCollectionDto): Promise<Collection> {
    const collection = await this.findOne(id);
    Object.assign(collection, dto);
    return this.collectionsRepository.save(collection);
  }

  async remove(id: string): Promise<void> {
    const collection = await this.findOne(id);
    await this.collectionsRepository.remove(collection);
  }
}
