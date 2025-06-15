export class Profile {
    id: number;
    userId: number;
    name: string;
    subscriptionPlan: string;


    constructor(data: Partial<Profile> = {}) {
        this.id = data.id ?? 0;
        this.userId = data.userId ?? 0;
        this.name = data.name ?? '';
        this.subscriptionPlan = data.subscriptionPlan ?? 'basic';
    }
}