import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GioXemComponent } from './gio-xem.component';

describe('GioXemComponent', () => {
  let component: GioXemComponent;
  let fixture: ComponentFixture<GioXemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GioXemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GioXemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
