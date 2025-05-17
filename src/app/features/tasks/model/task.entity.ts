// Define the Task class to represent a plant care task
export class Task {
    // Unique identifier for the task
    id: number;

    // Name of the plant associated with the task
    plantName: string;

    // URL of the image representing the plant
    imageUrl: string;

    // Date on which the task should be performed (as a string)
    date: string;

    // Type of action required (e.g., watering, fertilizing)
    action: string;

    // Indicates whether the task has been completed
    completed: boolean;

    // ID of the plant associated with the task
    plantId: number;

    // Constructor initializes all properties with default values
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

