import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComboComponent } from './popup-combo.component';

describe('PopupComboComponent', () => {
  let component: PopupComboComponent;
  let fixture: ComponentFixture<PopupComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
