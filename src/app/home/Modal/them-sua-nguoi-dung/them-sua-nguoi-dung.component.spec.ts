import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSuaNguoiDungComponent } from './them-sua-nguoi-dung.component';

describe('ThemSuaNguoiDungComponent', () => {
  let component: ThemSuaNguoiDungComponent;
  let fixture: ComponentFixture<ThemSuaNguoiDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemSuaNguoiDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemSuaNguoiDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
