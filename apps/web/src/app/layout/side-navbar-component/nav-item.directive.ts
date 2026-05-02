import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appNavItem]',
  standalone: true,
})
export class NavItemDirective {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() route?: string;
}
