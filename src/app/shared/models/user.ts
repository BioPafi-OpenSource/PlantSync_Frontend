export class User {
    id: number;           // Unique identifier for the user
    name: string;         // User's full name
    email: string;        // User's email address
    password: string;     // User's password (should be handled securely)
    plantIds: number[];   // Array of plant IDs associated with the user

    // Constructor accepts a partial User object to initialize properties,
    // using default values if properties are not provided
    constructor(data: Partial<User> = {}) {
        this.id = data.id ?? 0;
        this.name = data.name ?? '';
        this.email = data.email ?? '';
        this.password = data.password ?? '';
        this.plantIds = data.plantIds ?? [];
    }
}
