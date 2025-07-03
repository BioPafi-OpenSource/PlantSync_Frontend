export class Plant {
    id: number;
    name: string;
    species: string;
    acquisitionDate: string;
    humidity: string;
    nextWateringDate: string;
    imageUrl: string;
    notificationsEnabled: boolean;
    profileId: number;


    constructor() {
        this.id = 0;
        this.name = "";
        this.species = "";
        this.acquisitionDate = "";
        this.humidity = "";
        this.nextWateringDate = "";
        this.imageUrl = "";
        this.notificationsEnabled = false;
        this.profileId = 0;
    }
}
