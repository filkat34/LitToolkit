import { TestBed } from '@angular/core/testing';

import { ImportdocumentService } from './importdocument.service';

describe('ImportdocumentService', () => {
  let service: ImportdocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportdocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
