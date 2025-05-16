export class PlantHistory {
    constructor(
        public id: number,
        public plantId: number,
        public type: string,
        public date: string,
        public time: string,
        public humidity: number
    ) {}

    get formattedDate(): string {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(this.date).toLocaleDateString('es-PE', options);
    }

    get datetime(): string {
        return `${this.date} ${this.time}`;
    }
}
