import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UngDungComponent } from './ung-dung.component';

describe('UngDungComponent', () => {
  let component: UngDungComponent;
  let fixture: ComponentFixture<UngDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UngDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UngDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
