import { TestBed } from '@angular/core/testing';

import { RealWeatherService } from './real-weather.service';

describe('RealWeatherService', () => {
  let service: RealWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
