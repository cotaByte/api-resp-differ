import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({ description: 'Name of the collection' })
  name!: string;

  @ApiPropertyOptional({ description: 'Optional description' })
  description?: string;

  @ApiPropertyOptional({
    description: 'ID of the user creating the collection',
  })
  createdBy?: string;
}
