import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangDatVeComponent } from './trang-dat-ve.component';

describe('TrangDatVeComponent', () => {
  let component: TrangDatVeComponent;
  let fixture: ComponentFixture<TrangDatVeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangDatVeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangDatVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
