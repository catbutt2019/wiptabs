import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowProjectsPage } from './follow-projects.page';

describe('FollowProjectsPage', () => {
  let component: FollowProjectsPage;
  let fixture: ComponentFixture<FollowProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowProjectsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
