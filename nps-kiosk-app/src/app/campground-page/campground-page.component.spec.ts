import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundPageComponent } from './campground-page.component';

describe('CampgroundPageComponent', () => {
  let component: CampgroundPageComponent;
  let fixture: ComponentFixture<CampgroundPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampgroundPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
