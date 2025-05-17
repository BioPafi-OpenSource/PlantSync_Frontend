// Class representing the current weather status for a specific location
export class WeatherStatus {
    // Constructor to initialize the weather status properties
    constructor(
        public id: number,           // Unique identifier for the weather record
        public location: string,     // Location name or identifier
        public temperature: number,  // Current temperature at the location
        public humidity: number      // Current humidity percentage at the location
    ) {}
}