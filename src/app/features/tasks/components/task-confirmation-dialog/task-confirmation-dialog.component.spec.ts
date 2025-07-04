import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskConfirmationDialogComponent } from './task-confirmation-dialog.component';

describe('TaskConfirmationDialogComponent', () => {
  let component: TaskConfirmationDialogComponent;
  let fixture: ComponentFixture<TaskConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
