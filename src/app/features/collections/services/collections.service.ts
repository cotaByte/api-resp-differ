import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../models/collection.model';

type CollectionDto = Omit<Collection, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/collections';

  private readonly _collections = signal<Collection[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly collections = this._collections.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  private mapDto(dto: CollectionDto): Collection {
    return {
      ...dto,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  load(): void {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<CollectionDto[]>(this.apiUrl).subscribe({
      next: (data) => {
        this._collections.set(data.map((c) => this.mapDto(c)));
        this._loading.set(false);
      },
      error: () => {
        this._error.set(
          'Failed to load collections. Make sure the API server is running on port 3000.',
        );
        this._loading.set(false);
      },
    });
  }

  add(data: { name: string; tag: string }): void {
    const now = new Date().toISOString();
    const payload = { name: data.name, tag: data.tag, createdAt: now, updatedAt: now };
    this.http.post<CollectionDto>(this.apiUrl, payload).subscribe({
      next: (created) => {
        this._collections.update((cols) => [...cols, this.mapDto(created)]);
      },
    });
  }

  remove(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this._collections.update((cols) => cols.filter((c) => c.id !== id));
      },
    });
  }
}
