import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangChiTietComponent } from './trang-chi-tiet.component';

describe('TrangChiTietComponent', () => {
  let component: TrangChiTietComponent;
  let fixture: ComponentFixture<TrangChiTietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangChiTietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
