import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangDangNhapComponent } from './trang-dang-nhap.component';

describe('TrangDangNhapComponent', () => {
  let component: TrangDangNhapComponent;
  let fixture: ComponentFixture<TrangDangNhapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangDangNhapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangDangNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
