export interface IPlace {
    name: string;
    location: {
        lat: number
        lng: number
    };
    description?: string;
    expo?: string;
}