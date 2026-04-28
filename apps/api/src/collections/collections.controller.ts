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
import { Collection } from '../database/entities/collection.entity';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  @ApiCreatedResponse({ type: Collection })
  create(@Body() dto: CreateCollectionDto): Promise<Collection> {
    return this.collectionsService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [Collection] })
  findAll(): Promise<Collection[]> {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Collection })
  @ApiNotFoundResponse({ description: 'Collection not found' })
  findOne(@Param('id') id: string): Promise<Collection> {
    return this.collectionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Collection })
  @ApiNotFoundResponse({ description: 'Collection not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Collection deleted' })
  @ApiNotFoundResponse({ description: 'Collection not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.collectionsService.remove(id);
  }
}
