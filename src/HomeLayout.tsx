import React, { Component } from 'react';
import MapBox from './component/Mapbox';
import Sidebar from './component/Sidebar';
import { searchAddress, initialPlaces } from './util/map.client';
import { IPlace } from './types';
import './app.css';


interface IHomeLayoutState {
    places: IPlace[]
}

class HomeLayout extends Component<{}, IHomeLayoutState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            places: initialPlaces
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

    private mixePlaces(origin: number, destination: number): void {
        if (origin !== destination) {
            const places = this.state.places;
            const draggedPlace = places[origin];
            places.splice(origin, 1);
            places.splice(destination, 0, draggedPlace);
            this.setState({
                places
            });
        }
    }

    private renderBoard(): JSX.Element {
        return (
            <div className="HomeLayout__boardWrapper">
                <Sidebar searchAddress={value => this.searchLocation(value)} 
                places={this.state.places} deletePlace={place => this.onDeletePlace(place)} mixePlace={this.mixePlaces.bind(this)}/>
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
