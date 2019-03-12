import React, { Component } from 'react';
import 'googlemaps';
import { IPlace } from '../../types';

interface IPlacesListProps {
    places: IPlace[]
}

export class PlaceList extends Component<IPlacesListProps, IPlacesListProps> {

    constructor(props: IPlacesListProps) {
        super(props);
        this.state = {
            places: this.props.places
        };
    }

    componentWillReceiveProps(props: IPlacesListProps) {
        if (this.state.places !== props.places) {
            this.setState({
                places: props.places
            });
        } 
    }

    render() {
        const { places } = this.state;
        return (
            <div className="ui-route-list">
                <div className="ui-route-list__wrapper">
                    {
                        places.map((place, index) => {
                            return (
                                <div key={index} title={`Точка маршрута ${index + 1}`}>
                                    <input value={place.name} readOnly/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}