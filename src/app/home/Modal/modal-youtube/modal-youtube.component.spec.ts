import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalYoutubeComponent } from './modal-youtube.component';

describe('ModalYoutubeComponent', () => {
  let component: ModalYoutubeComponent;
  let fixture: ComponentFixture<ModalYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
