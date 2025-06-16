export class WeatherStatus {
    constructor(
        public id: number,
        public location: string,
        public temperature: number,
        public humidity: number
    ) {}
}
