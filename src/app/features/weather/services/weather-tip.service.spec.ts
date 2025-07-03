import { TestBed } from '@angular/core/testing';

import { WeatherTipService } from './weather-tip.service';

describe('WeatherTipService', () => {
  let service: WeatherTipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherTipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
