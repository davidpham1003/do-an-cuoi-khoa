import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhGIaComponent } from './danh-gia.component';

describe('DanhGIaComponent', () => {
  let component: DanhGIaComponent;
  let fixture: ComponentFixture<DanhGIaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhGIaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhGIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
