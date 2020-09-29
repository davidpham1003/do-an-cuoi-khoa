import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSuaLichChieuComponent } from './them-sua-lich-chieu.component';

describe('ThemSuaLichChieuComponent', () => {
  let component: ThemSuaLichChieuComponent;
  let fixture: ComponentFixture<ThemSuaLichChieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemSuaLichChieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemSuaLichChieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
