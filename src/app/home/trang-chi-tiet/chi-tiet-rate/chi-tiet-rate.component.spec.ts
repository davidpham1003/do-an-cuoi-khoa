import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietRateComponent } from './chi-tiet-rate.component';

describe('ChiTietRateComponent', () => {
  let component: ChiTietRateComponent;
  let fixture: ComponentFixture<ChiTietRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
