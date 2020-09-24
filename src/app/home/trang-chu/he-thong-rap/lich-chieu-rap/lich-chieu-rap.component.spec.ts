import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichChieuRapComponent } from './lich-chieu-rap.component';

describe('LichChieuRapComponent', () => {
  let component: LichChieuRapComponent;
  let fixture: ComponentFixture<LichChieuRapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichChieuRapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichChieuRapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
