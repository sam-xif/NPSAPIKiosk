import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkPageComponent } from './park-page.component';

describe('ParkPageComponent', () => {
  let component: ParkPageComponent;
  let fixture: ComponentFixture<ParkPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
