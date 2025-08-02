import { TestBed } from '@angular/core/testing';

import { BookEventservice } from './book-eventservice';

describe('BookEventservice', () => {
  let service: BookEventservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookEventservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
