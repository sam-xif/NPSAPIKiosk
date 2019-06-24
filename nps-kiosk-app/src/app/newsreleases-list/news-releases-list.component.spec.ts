import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsReleasesListComponent } from './news-releases-list.component';

describe('NewsReleasesListComponent', () => {
  let component: NewsReleasesListComponent;
  let fixture: ComponentFixture<NewsReleasesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsReleasesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsReleasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
