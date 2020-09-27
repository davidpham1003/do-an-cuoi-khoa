import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSuaPhimComponent } from './them-sua-phim.component';

describe('ThemSuaPhimComponent', () => {
  let component: ThemSuaPhimComponent;
  let fixture: ComponentFixture<ThemSuaPhimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemSuaPhimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemSuaPhimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
