import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkLearnPageComponent } from './park-learn-page.component';

describe('ParkLearnPageComponent', () => {
  let component: ParkLearnPageComponent;
  let fixture: ComponentFixture<ParkLearnPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkLearnPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkLearnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
