import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-history',
  template: `<p>History</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class History {}
