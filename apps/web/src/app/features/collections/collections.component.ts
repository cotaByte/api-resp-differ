import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Collection } from '@api-resp-differ/api-client';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { CollectionsService } from './collections.service';

@Component({
  selector: 'app-collections',
  imports: [ReactiveFormsModule, ModalComponent, CollectionCardComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsComponent implements OnInit {
  private readonly collectionsService = inject(CollectionsService);
  private readonly fb = inject(FormBuilder);

  readonly collections = signal<Collection[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly submitting = signal(false);

  private readonly createModal = viewChild.required<ModalComponent>('createModal');
  private readonly editModal = viewChild.required<ModalComponent>('editModal');

  private editingId = signal<string | null>(null);

  readonly createForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
  });

  readonly editForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  async ngOnInit(): Promise<void> {
    await this.loadCollections();
  }

  private async loadCollections(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const result = await this.collectionsService.getAll();
      this.collections.set(result);
    } catch {
      this.error.set('Failed to load collections.');
    } finally {
      this.loading.set(false);
    }
  }

  openCreateModal(): void {
    this.createForm.reset();
    this.createModal().open();
  }

  async submitCreate(): Promise<void> {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    try {
      const { name, description } = this.createForm.getRawValue();
      const created = await this.collectionsService.create({
        name,
        description: description || undefined,
      });
      this.collections.update((list) => [created, ...list]);
      this.createModal().close();
    } catch {
      this.error.set('Failed to create collection.');
    } finally {
      this.submitting.set(false);
    }
  }

  openEditModal(collection: Collection): void {
    this.editingId.set(collection.id);
    this.editForm.reset({ name: collection.name });
    this.editModal().open();
  }

  async submitEdit(): Promise<void> {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    const id = this.editingId();
    if (!id) return;

    this.submitting.set(true);
    try {
      const { name } = this.editForm.getRawValue();
      const updated = await this.collectionsService.update(id, { name });
      this.collections.update((list) => list.map((c) => (c.id === id ? updated : c)));
      this.editModal().close();
    } catch {
      this.error.set('Failed to update collection.');
    } finally {
      this.submitting.set(false);
    }
  }

  async deleteCollection(id: string): Promise<void> {
    try {
      await this.collectionsService.remove(id);
      this.collections.update((list) => list.filter((c) => c.id !== id));
    } catch {
      this.error.set('Failed to delete collection.');
    }
  }
}
