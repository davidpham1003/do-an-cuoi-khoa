import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichChieuPhimComponent } from './lich-chieu-phim.component';

describe('LichChieuPhimComponent', () => {
  let component: LichChieuPhimComponent;
  let fixture: ComponentFixture<LichChieuPhimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichChieuPhimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichChieuPhimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
