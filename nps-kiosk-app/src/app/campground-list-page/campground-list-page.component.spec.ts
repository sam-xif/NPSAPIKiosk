import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundListPageComponent } from './campground-list-page.component';

describe('CampgroundListPageComponent', () => {
  let component: CampgroundListPageComponent;
  let fixture: ComponentFixture<CampgroundListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampgroundListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
