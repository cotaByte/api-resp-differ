import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Collection } from './collection.entity';

@Entity('collection_endpoints')
@Unique(['collectionId', 'position'])
export class CollectionEndpoint {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'collection_id', type: 'bigint' })
  collectionId: string;

  @ManyToOne(() => Collection, (collection) => collection.endpoints, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @Column({ type: 'integer' })
  position: number;

  @Column({ type: 'varchar', length: 10 })
  method: string;

  @Column({ name: 'url_template', type: 'text' })
  urlTemplate: string;

  @Column({ type: 'jsonb', default: {} })
  headers: Record<string, string>;

  @Column({ name: 'body_template', type: 'jsonb', nullable: true })
  bodyTemplate: Record<string, unknown> | null;

  @Column({ name: 'timeout_ms', type: 'integer', nullable: true })
  timeoutMs: number | null;

  @Column({ name: 'retry_count', type: 'integer', default: 0 })
  retryCount: number;

  @Column({ name: 'retry_delay_ms', type: 'integer', nullable: true })
  retryDelayMs: number | null;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
