import React, { Component } from 'react';

export interface IPlace {
    name: string;
    location: {
        lat: number
        lng: number
    };
    description?: string;
    expo?: string;
}

interface IPlacesListProps {
    places: IPlace[]
    onRouteMixed?: Function
}

interface IPlacesListState extends IPlacesListProps {
    hasListChanged?: boolean
}


export class RouteList extends Component<IPlacesListProps, IPlacesListState> {

    constructor(props: IPlacesListProps) {
        super(props);
        this.state = {
            places: this.props.places
        };

        if (this.props.onRouteMixed) {
            this.props.onRouteMixed();
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

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}