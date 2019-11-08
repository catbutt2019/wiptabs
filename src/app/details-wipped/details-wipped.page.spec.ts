import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWippedPage } from './details-wipped.page';

describe('DetailsWippedPage', () => {
  let component: DetailsWippedPage;
  let fixture: ComponentFixture<DetailsWippedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsWippedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsWippedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
