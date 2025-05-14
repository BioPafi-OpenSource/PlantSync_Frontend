import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../model/task.entity";
import {NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../services/task.service";
import {TaskConfirmationDialogComponent} from "../task-confirmation-dialog/task-confirmation-dialog.component";

@Component({
  selector: 'app-task-item',
  imports: [

    MatCard,
    NgOptimizedImage,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  /**
   * canConfirm: if plant task is not assigned for today, it wont be clickable
   *
   */

  @Input() task!: Task;
  @Input() canConfirm: boolean = true;
  @Output() taskClicked = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();

  constructor(
      private dialog: MatDialog,
      private taskService: TaskService
  ) {}



  onClick(): void {
    if (!this.canConfirm) return;
    const dialogRef = this.dialog.open(TaskConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.taskService.delete(this.task.id).subscribe(() => {
          console.log(`Task ${this.task.id} deleted`);
          this.taskDeleted.emit(this.task.id);
        });
      }
    });
  }
}