import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCollectionDto {
  @ApiPropertyOptional({ description: 'Name of the collection' })
  name?: string;

  @ApiPropertyOptional({ description: 'Optional description' })
  description?: string;
}
