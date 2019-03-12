import 'googlemaps';

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


export async function searchAddress(address: string): Promise<IGoogleSearchResponse> {
    const google = googleInstance();
    const coder = new google.maps.Geocoder();
    const request: google.maps.GeocoderRequest = {
        address
    }

    return new Promise((resolve, reject) => {
        coder.geocode(request, (results, status) => {
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