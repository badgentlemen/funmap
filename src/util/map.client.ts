import 'googlemaps';
import { IPlace } from "../types";

const googleInstance = () => {
    try {
        if (google) {
            return google;
        } else {
            throw new Error('google is not defined');
        }
    } catch (e) {
        throw e;
    }
}

export const initialPosition: google.maps.LatLngLiteral = {
    lat: 43.6626738,
    lng: 43.52794080000001
}

export const initialPlaces: IPlace[] = [
    {
        "name": "ул. Тамбиева, Дугулубгей, Кабардино-Балкарская Респ., Россия",
        "location": {
            "lat": 43.6626738,
            "lng": 43.52794080000001
        }
    },
    {
        "name": "Нальчик, Кабардино-Балкарская Респ., Россия",
        "location": {
            "lat": 43.4949918,
            "lng": 43.60451330000001
        }
    },
    {
        "name": "Москва, Россия",
        "location": {
            "lat": 55.755826,
            "lng": 37.617299900000035
        }
    },
    {
        "name": "Владивосток, Приморский край, Россия",
        "location": {
            "lat": 43.1198091,
            "lng": 131.88692430000003
        }
    }
]

export interface IGoogleSearchResponse {
    formattedAddress: string
    rawAddress: string
    placeID?: string
    location: {
        lat: number
        lng: number
    }
    locationType: google.maps.GeocoderLocationType
}


export async function directionBetweenRoutes(places: IPlace[]): Promise<google.maps.DirectionsResult> {
    const google = googleInstance();
    const directionService = new google.maps.DirectionsService()
    return new Promise((resolve, reject) => {

        if (places.length === 1) {
            return resolve({
                geocoded_waypoints: [],
                routes: []
            });
        }

        const { 0: origin, [places.length - 1]: destination } = places;

        if (places.length) {

            const poinst: google.maps.DirectionsWaypoint[] = places.map(route => {
                const point: google.maps.DirectionsWaypoint = {
                    location: route.location,
                    stopover: false
                };
                return point;
            });

            const request: google.maps.DirectionsRequest = {
                origin: origin.location,
                destination: destination.location,
                waypoints: poinst,
                travelMode: google.maps.TravelMode.DRIVING,
                optimizeWaypoints: false,
                provideRouteAlternatives: false,
            };

            directionService.route(request, (result, status) => {
                if (status == google.maps.DirectionsStatus.OK) {
                    return resolve(result);
                } else {
                    return reject();
                }
            })
        } else {
            return reject();
        }
    })
}


export async function searchAddress(address: string): Promise<IGoogleSearchResponse> {
    const google = googleInstance();
    const geoCoderService = new google.maps.Geocoder();
    const request: google.maps.GeocoderRequest = {
        address
    }

    return new Promise((resolve, reject) => {
        geoCoderService.geocode(request, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let result: google.maps.GeocoderResult | null = results.length ? results[0] : null;

                if (!result) {
                    let error = new Error('Не найдено подходящих роутов');
                    return reject(error);
                }

                let response: IGoogleSearchResponse = {
                    rawAddress: address,
                    formattedAddress: result.formatted_address,
                    location: result.geometry.location.toJSON(),
                    locationType: result.geometry.location_type
                }
                return resolve(response);
            }
            let error = new Error(status.toString());
            return reject(error);
        });
    })
}