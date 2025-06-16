import {Component, ViewChild} from '@angular/core';
import {TaskListComponent} from "../../components/task-list/task-list.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddTaskDialogComponent} from "../../components/add-task-dialog/add-task-dialog.component";

@Component({
  selector: 'app-task-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css'],
  standalone: true,
  imports: [CommonModule, TaskListComponent, MatButtonModule, MatIconModule, MatDialogModule],
})
export class TaskViewComponent {

  constructor(private dialog: MatDialog) {}
@ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.taskListComponent.refreshTasks();
      }
    });
  }
}
