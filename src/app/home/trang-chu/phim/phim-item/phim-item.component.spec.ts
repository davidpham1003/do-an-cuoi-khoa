import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhimItemComponent } from './phim-item.component';

describe('PhimItemComponent', () => {
  let component: PhimItemComponent;
  let fixture: ComponentFixture<PhimItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhimItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhimItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
