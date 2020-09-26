import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDangNhapComponent } from './admin-dang-nhap.component';

describe('AdminDangNhapComponent', () => {
  let component: AdminDangNhapComponent;
  let fixture: ComponentFixture<AdminDangNhapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDangNhapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDangNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
