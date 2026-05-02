import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTargetDto {
  @ApiPropertyOptional({ description: 'URL of the target' })
  url?: string;

  @ApiPropertyOptional({ description: 'Color label for the target' })
  color?: string;

  @ApiPropertyOptional({ description: 'Tag for the target' })
  tag?: string;
}
