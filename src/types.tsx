export interface IPlace extends google.maps.Place {
    name: string;
    location: google.maps.LatLng | google.maps.LatLngLiteral;
    description?: string;
    expo?: string;
}
