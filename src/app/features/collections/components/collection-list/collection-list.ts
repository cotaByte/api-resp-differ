import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { CollectionsService } from '../../services/collections.service';
import { CollectionFormModal } from '../collection-form-modal/collection-form-modal';

@Component({
  selector: 'app-collection-list',
  imports: [DatePipe],
  templateUrl: './collection-list.html',
  styleUrl: './collection-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionList {
  private readonly collectionsService = inject(CollectionsService);
  private readonly dialog = inject(Dialog);

  readonly collections = this.collectionsService.collections;
  readonly loading = this.collectionsService.loading;
  readonly error = this.collectionsService.error;

  constructor() {
    this.collectionsService.load();
  }

  openCreateModal(): void {
    const ref = this.dialog.open<{ name: string; tag: string }>(CollectionFormModal, {
      hasBackdrop: true,
      backdropClass: 'modal-backdrop',
    });
    ref.closed.subscribe((result) => {
      if (result) {
        this.collectionsService.add(result);
      }
    });
  }

  deleteCollection(id: string): void {
    this.collectionsService.remove(id);
  }
}
