import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `<p>Settings</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {}
