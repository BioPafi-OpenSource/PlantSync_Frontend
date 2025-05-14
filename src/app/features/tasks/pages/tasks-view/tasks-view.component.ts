import { Component } from '@angular/core';
import {TaskListComponent} from "../../components/task-list/task-list.component";

@Component({
  selector: 'app-task-view',
  templateUrl: './tasks-view.component.html',
  imports: [
    TaskListComponent
  ],
  styleUrls: ['./tasks-view.component.css']
})
export class TaskViewComponent {}
