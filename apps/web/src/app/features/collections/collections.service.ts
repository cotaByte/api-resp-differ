import { inject, Injectable } from '@angular/core';
import {
  Api,
  Collection,
  collectionsControllerCreate,
  collectionsControllerFindAll,
  collectionsControllerRemove,
  collectionsControllerUpdate,
  CreateCollectionDto,
  UpdateCollectionDto,
} from '@api-resp-differ/api-client';

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private readonly api = inject(Api);

  getAll(): Promise<Collection[]> {
    return this.api.invoke(collectionsControllerFindAll);
  }

  create(body: CreateCollectionDto): Promise<Collection> {
    return this.api.invoke(collectionsControllerCreate, { body });
  }

  update(id: string, body: UpdateCollectionDto): Promise<Collection> {
    return this.api.invoke(collectionsControllerUpdate, { id, body });
  }

  remove(id: string): Promise<void> {
    return this.api.invoke(collectionsControllerRemove, { id });
  }
}
