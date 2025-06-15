import { Injectable } from '@angular/core';
import { Task} from "../model/task.entity";
import { BaseService} from "../../../shared/services/base.service";
import { environment} from "../../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
// TaskService extends the generic BaseService to manage Task entities.
// It specifies the API endpoint for tasks from the environment configuration.

export class TaskService extends BaseService<Task> {

    override resourceEndpoint = environment.ENDPOINT_PATH_TASKS;

    constructor() {
        super();
    }

    // Marks a task as completed by fetching it, setting its completed flag to true,
    // and then updating it via the API.
    completeTask(id: number): void {
        this.getById(id).subscribe(task => {
            task.completed = true;
            this.update(id, task).subscribe();
        });
    }

    // Deletes a task by its ID using the base service delete method.
    deleteTask(id: number): void {
        this.delete(id).subscribe();
    }
}