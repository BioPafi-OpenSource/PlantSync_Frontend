export class Task {
    id: number;
    plantName: string;
    imageUrl: string;
    date: string;
    action: string;
    completed: boolean;
    plantId: number;

    constructor() {

        this.id = 0;
        this.plantName = '';
        this.imageUrl = '';
        this.date = '';
        this.action = '';
        this.completed = false;
        this.plantId = 0;

    }


}
