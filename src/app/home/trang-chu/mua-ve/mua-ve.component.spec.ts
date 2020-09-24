import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuaVeComponent } from './mua-ve.component';

describe('MuaVeComponent', () => {
  let component: MuaVeComponent;
  let fixture: ComponentFixture<MuaVeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuaVeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuaVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
