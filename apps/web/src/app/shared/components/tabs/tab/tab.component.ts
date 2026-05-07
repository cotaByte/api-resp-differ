import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  signal,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  readonly id = input.required<string>();
  readonly label = input<string>('');
  readonly headerTemplate = contentChild<TemplateRef<void>>('tabHeader');

  readonly selected = signal<boolean>(false);
}
