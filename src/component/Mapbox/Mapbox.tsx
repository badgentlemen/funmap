import React, { Component, createRef } from 'react';
import 'googlemaps';
import { initialPosition } from '../../util/map.client';

interface IMapBoxProps {
    initialPosition?: google.maps.LatLngLiteral
}

interface IMapBoxState {
    initialPosition: google.maps.LatLngLiteral
}

export default class MapBox extends Component<IMapBoxProps, IMapBoxState> {
    private mapRef = createRef<HTMLDivElement>();
    private mapKit: typeof google | null = null;
    private map: google.maps.Map | null = null;
    constructor(props: IMapBoxProps) {
        super(props);
        this.state = {
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
            this.renderMap();
        } else {
            this.initMap();
        }
    }

    private destroyMap() {
        // this.map = null;
    }

    renderMap() {
        const center = this.state.initialPosition;

        const mapOptions: google.maps.MapOptions = {
            center,
            zoom: 12,
            disableDefaultUI: true
        }

        const node = this.mapRef.current;
        if (this.mapKit && node) {
            this.map = new this.mapKit.maps.Map(node, mapOptions);
        }
    }
    
    render() {
        return (
            <div className="ui-map-box">
                <div className="ui-map-box__wrapper">
                    <div className="map-box" id="mapbox" ref={this.mapRef}></div>
                </div>
            </div>
        )
    }
}