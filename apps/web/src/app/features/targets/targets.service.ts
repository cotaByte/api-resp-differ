import { inject, Injectable } from '@angular/core';
import {
  Api,
  CreateTargetDto,
  Target,
  targetsControllerCreate,
  targetsControllerFindAll,
  targetsControllerRemove,
  targetsControllerUpdate,
  UpdateTargetDto,
} from '@api-resp-differ/api-client';

@Injectable({ providedIn: 'root' })
export class TargetsService {
  private readonly api = inject(Api);

  getAll(): Promise<Target[]> {
    return this.api.invoke(targetsControllerFindAll);
  }

  create(body: CreateTargetDto): Promise<Target> {
    return this.api.invoke(targetsControllerCreate, { body });
  }

  update(id: string, body: UpdateTargetDto): Promise<Target> {
    return this.api.invoke(targetsControllerUpdate, { id, body });
  }

  remove(id: string): Promise<void> {
    return this.api.invoke(targetsControllerRemove, { id });
  }
}
