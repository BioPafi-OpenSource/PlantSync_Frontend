// Represents a guide with details such as id, title, name, description, topic, type, and an image URL
export class Guide {
    id: number;           // Unique identifier for the guide
    title: string;        // Title of the guide
    name: string;         // Name associated with the guide
    description: string;  // Detailed description of the guide
    topic: string;        // Topic category of the guide
    type: string;         // Type or format of the guide
    imageUrl: string;     // URL to an image representing the guide

    // Initializes all properties with default empty or zero values
    constructor() {
        this.id = 0;
        this.title = "";
        this.name = "";
        this.description = "";
        this.topic = "";
        this.type = "";
        this.imageUrl = "";
    }
}
