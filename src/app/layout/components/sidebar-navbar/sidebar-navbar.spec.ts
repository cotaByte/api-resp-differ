import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavbar } from './sidebar-navbar';

describe('SidebarNavbar', () => {
  let component: SidebarNavbar;
  let fixture: ComponentFixture<SidebarNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
