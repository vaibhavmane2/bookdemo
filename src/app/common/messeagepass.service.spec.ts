import { TestBed } from '@angular/core/testing';

import { MesseagepassService } from './messeagepass.service';

describe('MesseagepassService', () => {
  let service: MesseagepassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesseagepassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
