import { TestBed } from '@angular/core/testing';

import { TestSevicesService } from './test-sevices.service';

describe('TestSevicesService', () => {
  let service: TestSevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
