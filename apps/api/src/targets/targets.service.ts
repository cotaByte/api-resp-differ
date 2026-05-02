import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Target } from '../database/entities/target.entity';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';

@Injectable()
export class TargetsService {
  constructor(
    @InjectRepository(Target)
    private readonly targetsRepository: Repository<Target>,
  ) {}

  create(dto: CreateTargetDto): Promise<Target> {
    const target = this.targetsRepository.create(dto);
    return this.targetsRepository.save(target);
  }

  findAll(): Promise<Target[]> {
    return this.targetsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Target> {
    const target = await this.targetsRepository.findOneBy({ id });
    if (!target) {
      throw new NotFoundException(`Target ${id} not found`);
    }
    return target;
  }

  async update(id: string, dto: UpdateTargetDto): Promise<Target> {
    const target = await this.findOne(id);
    Object.assign(target, dto);
    return this.targetsRepository.save(target);
  }

  async remove(id: string): Promise<void> {
    const target = await this.findOne(id);
    await this.targetsRepository.remove(target);
  }
}
