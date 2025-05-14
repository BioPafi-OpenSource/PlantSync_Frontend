import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService} from "../../services/task.service";
import { Task} from "../../model/task.entity";
import { TaskConfirmationDialogComponent} from "../task-confirmation-dialog/task-confirmation-dialog.component";
import {TaskItemComponent} from "../task-item/task-item.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [
    TaskItemComponent,
    NgForOf
  ],
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  todayTasks: Task[] = [];
  upcomingTasks: Task[] = [];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.getAll().subscribe((tasksFromApi: any[]) => {
      const today = new Date().toISOString().split('T')[0];

      const mappedTasks = tasksFromApi.map(taskFromApi => {
        let task = new Task();
        task.id = taskFromApi.id;
        task.plantName = taskFromApi.plant.plantName;
        task.imageUrl = taskFromApi.plant.imageUrl;
        task.date = taskFromApi.date;
        task.action = taskFromApi.action;
        task.completed = taskFromApi.completed;
        task.plantId = taskFromApi.plant.plantId;
        return task;
      });

      this.todayTasks = mappedTasks.filter(t => t.date === today);
      this.upcomingTasks = mappedTasks.filter(t => t.date !== today);
    });
  }

  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskConfirmationDialogComponent, {
      width: '250px',
      data: { task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(task.id);
      }
    });
  }

  deleteTask(id: number): void {
    this.todayTasks = this.todayTasks.filter(task => task.id !== id);
  }
}
