import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCenterListComponent } from './visitor-center-list.component';

describe('VisitorCenterListComponent', () => {
  let component: VisitorCenterListComponent;
  let fixture: ComponentFixture<VisitorCenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCenterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
