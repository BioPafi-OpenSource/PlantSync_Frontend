export class Plant {
    // Unique identifier for the plant
    id: number;

    // Name given to the plant by the user
    name: string;

    // Species or type of the plant
    species: string;

    // Date when the plant was acquired or added
    acquisitionDate: string;

    // Current humidity level related to the plant or its soil
    humidity: string;

    // Scheduled date for the next watering
    nextWateringDate: string;

    // URL of the plant's image
    imageUrl: string;

    // Flag indicating if notifications (e.g., watering reminders) are enabled
    notificationsEnabled: boolean;

    // Identifier of the user who owns the plant
    userId: number;

    // Constructor initializes all properties with default values
    constructor() {
        this.id = 0;
        this.name = "";
        this.species = "";
        this.acquisitionDate = "";
        this.humidity = "";
        this.nextWateringDate = "";
        this.imageUrl = "";
        this.notificationsEnabled = false;
        this.userId = 0;
    }
}

