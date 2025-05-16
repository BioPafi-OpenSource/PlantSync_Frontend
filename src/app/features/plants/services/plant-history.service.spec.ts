import { TestBed } from '@angular/core/testing';

import { PlantHistoryService } from './plant-history.service';

describe('PlantHistoryService', () => {
  let service: PlantHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
