import { TestBed, inject } from '@angular/core/testing';

import { ChecklistService } from './checklist.service';

describe('ChecklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistService]
    });
  });

  it('should ...', inject([ChecklistService], (service: ChecklistService) => {
    expect(service).toBeTruthy();
  }));
});
