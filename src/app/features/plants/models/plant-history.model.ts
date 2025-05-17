export class PlantHistory {
    // Constructor to initialize all properties of the PlantHistory record
    constructor(
        public id: number,           // Unique identifier for the history record
        public plantId: number,      // Identifier of the related plant
        public type: string,         // Type of event or record (e.g., watering, fertilizing)
        public date: string,         // Date when the event occurred (in string format)
        public time: string,         // Time when the event occurred (in string format)
        public humidity: number      // Recorded humidity value at the time of the event
    ) {}

    // Getter to format the date into a readable string with day, month, and year
    get formattedDate(): string {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        // Formats the date according to the 'es-PE' locale (Spanish - Peru)
        return new Date(this.date).toLocaleDateString('es-PE', options);
    }

    // Getter to combine date and time into a single datetime string
    get datetime(): string {
        return `${this.date} ${this.time}`;
    }
}

