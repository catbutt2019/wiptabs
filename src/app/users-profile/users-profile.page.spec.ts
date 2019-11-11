import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProfilePage } from './users-profile.page';

describe('UsersProfilePage', () => {
  let component: UsersProfilePage;
  let fixture: ComponentFixture<UsersProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
