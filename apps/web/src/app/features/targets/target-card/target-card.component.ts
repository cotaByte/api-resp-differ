import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Target } from '@api-resp-differ/api-client';

@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrl: './target-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetCardComponent {
  readonly target = input.required<Target>();
  readonly edit = output<Target>();
  readonly delete = output<string>();

  onEdit(): void {
    this.edit.emit(this.target());
  }

  onDelete(): void {
    this.delete.emit(this.target().id);
  }
}
