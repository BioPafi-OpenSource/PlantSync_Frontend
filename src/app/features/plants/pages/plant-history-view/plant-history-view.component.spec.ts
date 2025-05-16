import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantHistoryViewComponent } from './plant-history-view.component';

describe('PlantHistoryViewComponent', () => {
  let component: PlantHistoryViewComponent;
  let fixture: ComponentFixture<PlantHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantHistoryViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
