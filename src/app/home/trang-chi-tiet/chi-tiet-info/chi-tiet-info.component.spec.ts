import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietInfoComponent } from './chi-tiet-info.component';

describe('ChiTietInfoComponent', () => {
  let component: ChiTietInfoComponent;
  let fixture: ComponentFixture<ChiTietInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
