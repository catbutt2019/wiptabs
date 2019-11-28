import { TestBed } from '@angular/core/testing';

import { FollowProjectService } from './follow-project.service';

describe('FollowProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowProjectService = TestBed.get(FollowProjectService);
    expect(service).toBeTruthy();
  });
});
