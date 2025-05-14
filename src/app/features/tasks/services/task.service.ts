import { Injectable } from '@angular/core';
import { Task} from "../model/task.entity";
import { BaseService} from "../../../shared/services/base.service";
import { environment} from "../../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class TaskService extends BaseService<Task> {

    override resourceEndpoint = environment.ENDPOINT_PATH_TASKS;

    constructor() {
        super();
    }


    completeTask(id: number): void {
        this.getById(id).subscribe(task => {
            task.completed = true;
            this.update(id, task).subscribe();
        });
    }


    deleteTask(id: number): void {
        this.delete(id).subscribe();
    }
}
