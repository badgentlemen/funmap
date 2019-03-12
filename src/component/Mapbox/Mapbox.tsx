import React, { Component, createRef } from 'react';
import 'googlemaps';
import { initialPosition, directionBetweenRoutes } from '../../util/map.client';
import { IRoute } from '../RouteList/RouteList';

const GROUTES: IRoute[] = [
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
    }
  ]

interface IMapBoxProps {
    initialPosition?: google.maps.LatLngLiteral
}

interface IMapBoxState {
    routes: IRoute[]
    mapInitialized: boolean
    initialPosition: google.maps.LatLngLiteral
}

export default class MapBox extends Component<IMapBoxProps, IMapBoxState> {
    private mapRef = createRef<HTMLDivElement>();
    private mapKit: typeof google | null = null;
    private map: google.maps.Map | null = null;
    private markers: google.maps.Marker[] = [];
    private directionsDisplay = new google.maps.DirectionsRenderer()
    constructor(props: IMapBoxProps) {
        super(props);
        this.state = {
            routes: GROUTES, 
            mapInitialized: false,
            initialPosition: this.props.initialPosition || initialPosition
        }
    }

    componentDidMount() {
        this.initMap();
        navigator.geolocation.getCurrentPosition((position) => {
            const coordinates: google.maps.LatLngLiteral = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            if (this.map) {
                this.map.panTo(coordinates);
            }
        })
    }

    private initMap() {
        if (google) {
            this.mapKit = google;
            this.setState({
                mapInitialized: true
            });
            this.renderMap();
        } else {
            this.initMap();
        }
    }

    private destroyMap(): void {
        this.map = null;
        this.setState({
            mapInitialized: false
        })
    }

    renderMap(): void {
        const center = this.state.initialPosition;

        const mapOptions: google.maps.MapOptions = {
            center,
            zoom: 12,
            disableDefaultUI: true
        }

        const node = this.mapRef.current;
        if (this.mapKit && node) {
            this.map = new this.mapKit.maps.Map(node, mapOptions);
            this.afterMapInitialized();
        }
    }

    private afterMapInitialized(): void {
        this.map && this.directionsDisplay.setMap(this.map);

        const { routes } = this.state;
        this.setRoutes(routes);
    }

    getBounds() {
        return this.map ? this.map.getBounds() : null;
    }

    setCenter(): void {
        const center: google.maps.LatLngLiteral | null = null;
        if (this.map && center) {
            this.map.setCenter(center);
        }
    }

    clearMapFromMarkers(): void {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }

    setRoutes(routes: IRoute[]): void {
        this.clearMapFromMarkers();
        let markers: google.maps.Marker[] = routes.map(route => {

            const marker = new google.maps.Marker({
                position: route.location
            });

            return marker;
        });
        this.markers = markers;
        this.markers.forEach(marker => {
            this.addPlaceMarker(marker);
        });

        this.updateDirections();
    }

    addPlaceMarker(marker: google.maps.Marker): void {
        this.map && marker.setMap(this.map);
    }

    async updateDirections(): Promise<void> {
        try {
            const { routes } = this.state;
            console.log(routes)
            let directions = await directionBetweenRoutes(routes);
            this.directionsDisplay.setDirections(directions);
        } catch(error) {
            // console.log(error);
        }
    }

    render() {
        let { mapInitialized } = this.state;
        return (
            <div className="ui-map-box">
                <div className="ui-map-box__wrapper">
                    <div className="map-box" id="mapbox" ref={this.mapRef} style={{
                        display: mapInitialized ? 'block': 'none'
                    }} ></div>
                </div>
            </div>
        )
    }
}