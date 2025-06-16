export class Guide {
    id: number;
    title: string;
    name: string;
    description: string;
    topic: string;
    type: string;
    imageUrl: string;

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