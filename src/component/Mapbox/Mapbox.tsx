import React, { Component } from 'react';

interface IMapBoxProps {

}

interface IMapBoxState {
    map: HTMLDivElement | null
}

export default class MapBox extends Component<IMapBoxProps, IMapBoxState> {
    constructor(props: IMapBoxProps) {
        super(props);
        this.initMap();
    }

    private initMap() {
        
    }

    private destroyMap() {

    }

    renderMap() {

    }
    
    render() {
        return (
            <div className="ui-map-box">
                <div className="ui-map-box__wrapper">
                    <div className="map-box" id="mapbox"></div>
                </div>
            </div>
        )
    }
}