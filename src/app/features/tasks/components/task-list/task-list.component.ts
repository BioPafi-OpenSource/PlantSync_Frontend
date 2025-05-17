
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from "../../services/task.service";
import { Task } from "../../model/task.entity";
import { TaskConfirmationDialogComponent } from "../task-confirmation-dialog/task-confirmation-dialog.component";
import { TaskItemComponent } from "../task-item/task-item.component";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-task-list', // Component selector used in HTML
  templateUrl: './task-list.component.html', // HTML template file
  imports: [
    TaskItemComponent, // Import the custom task item component
    NgForOf             // Required for *ngFor directive
  ],
  styleUrls: ['./task-list.component.css'] // CSS style for the component
})
export class TaskListComponent implements OnInit {
  // Arrays to hold today's tasks and upcoming tasks
  todayTasks: Task[] = [];
  upcomingTasks: Task[] = [];

  // Inject TaskService and MatDialog into the constructor
  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    // Fetch all tasks from the API
    this.taskService.getAll().subscribe((tasksFromApi: any[]) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

      // Map raw task data from the API into Task objects
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

      // Filter tasks scheduled for today
      this.todayTasks = mappedTasks.filter(t => {
        const taskDate = new Date(t.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      });

      // Filter tasks scheduled for future dates (after today)
      this.upcomingTasks = mappedTasks.filter(t => {
        const taskDate = new Date(t.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() > today.getTime();
      });

    });
  }

  // Opens a confirmation dialog when the user tries to delete a task
  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskConfirmationDialogComponent, {
      width: '250px',
      data: { task: task }
    });

    // After the dialog is closed, check if user confirmed deletion
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(task.id); // Delete the task if confirmed
      }
    });
  }

  // Removes a task by ID from both today's and upcoming tasks
  deleteTask(id: number): void {
    this.todayTasks = this.todayTasks.filter(task => task.id !== id);
    this.upcomingTasks = this.upcomingTasks.filter(task => task.id !== id);
  }
}

