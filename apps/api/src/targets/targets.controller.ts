import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Target } from '../database/entities/target.entity';
import { TargetsService } from './targets.service';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';

@ApiTags('targets')
@Controller('targets')
export class TargetsController {
  constructor(private readonly targetsService: TargetsService) {}

  @Post()
  @ApiCreatedResponse({ type: Target })
  create(@Body() dto: CreateTargetDto): Promise<Target> {
    return this.targetsService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [Target] })
  findAll(): Promise<Target[]> {
    return this.targetsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Target })
  @ApiNotFoundResponse({ description: 'Target not found' })
  findOne(@Param('id') id: string): Promise<Target> {
    return this.targetsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Target })
  @ApiNotFoundResponse({ description: 'Target not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTargetDto,
  ): Promise<Target> {
    return this.targetsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Target deleted' })
  @ApiNotFoundResponse({ description: 'Target not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.targetsService.remove(id);
  }
}
