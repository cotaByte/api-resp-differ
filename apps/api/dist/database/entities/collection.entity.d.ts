import { CollectionEndpoint } from './collection-endpoint.entity';
export declare class Collection {
    id: string;
    name: string;
    description: string | null;
    createdBy: string | null;
    createdAt: Date;
    updatedAt: Date;
    endpoints: CollectionEndpoint[];
}
