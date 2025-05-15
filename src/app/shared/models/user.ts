export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    plantIds: number[];

    constructor(data: Partial<User> = {}) {
        this.id = data.id ?? 0;
        this.name = data.name ?? '';
        this.email = data.email ?? '';
        this.password = data.password ?? '';
        this.plantIds = data.plantIds ?? [];
    }
}
