import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Collection } from '@api-resp-differ/api-client';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardComponent {
  readonly collection = input.required<Collection>();
  readonly edit = output<Collection>();
  readonly delete = output<string>();

  onEdit(): void {
    this.edit.emit(this.collection());
  }

  onDelete(): void {
    this.delete.emit(this.collection().id);
  }
}
