import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangDangKyComponent } from './trang-dang-ky.component';

describe('TrangDangKyComponent', () => {
  let component: TrangDangKyComponent;
  let fixture: ComponentFixture<TrangDangKyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangDangKyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangDangKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
