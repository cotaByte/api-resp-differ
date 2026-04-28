import { Collection } from './collection.entity';
export declare class CollectionEndpoint {
    id: string;
    collectionId: string;
    collection: Collection;
    position: number;
    method: string;
    urlTemplate: string;
    headers: Record<string, string>;
    bodyTemplate: Record<string, unknown> | null;
    timeoutMs: number | null;
    retryCount: number;
    retryDelayMs: number | null;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}
