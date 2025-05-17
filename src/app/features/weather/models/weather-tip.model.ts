// Class representing a weather tip based on a range of humidity values
export class WeatherTip {
    // Constructor to initialize the humidity range and corresponding tip
    constructor(
        public humidityRange: [number, number],  // Tuple defining the min and max humidity range
        public tip: string                       // Advice or recommendation for that humidity range
    ) {}
}