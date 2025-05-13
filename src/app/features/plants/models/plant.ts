export interface Plant {
    id: number;
    name: string;
    species: string;
    acquisitionDate: string;
    humidity: string;
    nextWateringDate: string;
    imageUrl?: string;
    notificationsEnabled: boolean;
}
