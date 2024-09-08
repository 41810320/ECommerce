import { TestBed } from '@angular/core/testing';

import { SubCategorisService } from './sub-categoris.service';

describe('SubCategorisService', () => {
  let service: SubCategorisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCategorisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
