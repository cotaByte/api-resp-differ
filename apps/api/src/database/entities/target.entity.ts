import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('targets')
export class Target {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ApiProperty({ description: 'URL of the target' })
  @Column({ type: 'text' })
  url: string;

  @ApiPropertyOptional({ description: 'Color label for the target' })
  @Column({ type: 'text', nullable: true })
  color: string | null;

  @ApiPropertyOptional({ description: 'Tag for the target' })
  @Column({ type: 'text', nullable: true })
  tag: string | null;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
