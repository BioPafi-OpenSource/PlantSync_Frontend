// TaskViewComponent is a container component that displays the task list view.
// It imports the TaskListComponent to include the list of tasks in its template.

import { Component } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";

@Component({
  selector: 'app-task-view',
  templateUrl: './tasks-view.component.html',
  imports: [
    TaskListComponent
  ],
  styleUrls: ['./tasks-view.component.css']
})
export class TaskViewComponent {}