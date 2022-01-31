import { TestBed, inject } from '@angular/core/testing';

import { PermissionGuardService } from './permission-guard.service';

describe('PermissionGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionGuardService]
    });
  });

  it('should ...', inject([PermissionGuardService], (service: PermissionGuardService) => {
    expect(service).toBeTruthy();
  }));
});
