import React, { Component } from 'react';
import MapBox from './component/Mapbox';
import Sidebar from './component/Sidebar';
import { searchAddress } from './util/map.client';
import { IPlace } from './types';
import './app.css';


interface IHomeLayoutState {
    places: IPlace[]
}

class HomeLayout extends Component<{}, IHomeLayoutState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            places: []
        }
    }

    private async searchLocation(address: string) {
        try {
            let plcs = this.state.places;

            if (plcs.length <= 6) {
                let response = await searchAddress(address);
                let place: IPlace = {
                    name: response.formattedAddress,
                    location: response.location
                }
                plcs.push(place);
                this.setState({
                    places: plcs
                });
            } 

        } catch(e) {
            console.log(e);
        }
    }

    private onDeletePlace(place: IPlace) {
        const places = this.state.places;
        const index = places.indexOf(place);
        if (index !== -1) {
            places.splice(index, 1);
        }

        this.setState({
            places
        });
    }

    private renderBoard(): JSX.Element {
        return (
            <div className="HomeLayout__boardWrapper">
                <Sidebar searchAddress={value => this.searchLocation(value)} 
                places={this.state.places} deletePlace={place => this.onDeletePlace(place)}/>
            </div>
        )
    }

    private renderLayoutPage(): JSX.Element {
        return (
            <div className="HomeLayout__layoutPage">
                <MapBox places={this.state.places}/>
            </div>
        )
    }

    render() {
        return (
            <div className="HomeLayout__layout">
                <div className="HomeLayout__wrapper">
                    { this.renderBoard() }
                    { this.renderLayoutPage() }
                </div>
            </div>
        );
    }
}

export default HomeLayout;
