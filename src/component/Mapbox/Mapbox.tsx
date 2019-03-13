import React, { Component, createRef } from 'react';
import 'googlemaps';
import { initialPosition, directionBetweenRoutes } from '../../util/map.client';
import { IPlace } from "../../types";

interface IMapBoxProps {
    places: IPlace[];
    initialPosition?: google.maps.LatLngLiteral;
}

interface IMapBoxState {
    places: IPlace[];
    mapInitialized: boolean;
    initialPosition: google.maps.LatLngLiteral;
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
            places: this.props.places, 
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

    componentWillReceiveProps(props: IMapBoxProps) {
        const places = props.places;
        this.setPlaces(places);
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
        
        this.directionsDisplay.setRouteIndex(0);
        this.directionsDisplay.setOptions({
            suppressMarkers: true
        })

        const { places } = this.state;
        this.setPlaces(places);
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

    setPlaces(places: IPlace[]): void {
        this.clearMapFromMarkers();
        this.updateDirections(places);
    }

    setMarkersFromPlaces(places: IPlace[]): void {
        let markers: google.maps.Marker[] = places.map(place => {

            const marker = new google.maps.Marker({
                position: place.location,
                draggable: true
            });

            return marker;
        });
        this.markers = markers;
        this.markers.forEach(marker => {
            this.addPlaceMarker(marker);
        });
    }

    addPlaceMarker(marker: google.maps.Marker): void {
        this.map && marker.setMap(this.map);
    }

    async updateDirections(places: IPlace[]): Promise<void> {
        try {
            let directions = await directionBetweenRoutes(places);
            this.setMarkersFromPlaces(places);
            this.directionsDisplay.setDirections(directions);
        } catch(error) {
            
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