import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoPhimComponent } from './kho-phim.component';

describe('KhoPhimComponent', () => {
  let component: KhoPhimComponent;
  let fixture: ComponentFixture<KhoPhimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoPhimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoPhimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
