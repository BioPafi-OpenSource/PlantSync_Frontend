export class Task {
    id: number;
    date: string;
    action: string;
    completed: boolean;
    plantId: number;
    userId: number;

    constructor() {

        this.id = 0;
        this.date = '';
        this.action = '';
        this.completed = false;
        this.plantId = 0;
        this.userId = 0;

    }


}


export interface TaskViewModel extends Task {
    plantName: string;
    imageUrl: string;
}

