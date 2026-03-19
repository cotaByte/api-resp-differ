import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-compare',
  template: `<p>Compare</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Compare {}
