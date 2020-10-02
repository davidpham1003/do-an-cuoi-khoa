import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaTimComponent } from './tha-tim.component';

describe('ThaTimComponent', () => {
  let component: ThaTimComponent;
  let fixture: ComponentFixture<ThaTimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThaTimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThaTimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
