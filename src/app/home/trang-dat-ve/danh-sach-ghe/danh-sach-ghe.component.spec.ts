import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachGheComponent } from './danh-sach-ghe.component';

describe('DanhSachGheComponent', () => {
  let component: DanhSachGheComponent;
  let fixture: ComponentFixture<DanhSachGheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachGheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachGheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
