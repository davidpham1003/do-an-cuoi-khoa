import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietRapComponent } from './chi-tiet-rap.component';

describe('ChiTietRapComponent', () => {
  let component: ChiTietRapComponent;
  let fixture: ComponentFixture<ChiTietRapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietRapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietRapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
