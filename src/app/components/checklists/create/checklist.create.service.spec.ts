import { TestBed, inject } from '@angular/core/testing';

import { ChecklistCreateService } from './checklist.create.service';

describe('CreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistCreateService]
    });
  });

  it('should ...', inject([ChecklistCreateService], (service: ChecklistCreateService) => {
    expect(service).toBeTruthy();
  }));
});
