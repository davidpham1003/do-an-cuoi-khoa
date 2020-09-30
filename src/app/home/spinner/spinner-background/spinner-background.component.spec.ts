import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBackgroundComponent } from './spinner-background.component';

describe('SpinnerBackgroundComponent', () => {
  let component: SpinnerBackgroundComponent;
  let fixture: ComponentFixture<SpinnerBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
