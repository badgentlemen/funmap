import React, { Component } from 'react';
import 'googlemaps';

export interface IRoute extends google.maps.Place {
    name: string;
    location: google.maps.LatLng|google.maps.LatLngLiteral;
    description?: string
    expo?: string
}

interface IRouteListProps {
    routes: IRoute[]
    onRouteMixed?: Function
}

interface IRouteListState extends IRouteListProps {
    hasListChanged?: boolean
}


export class RouteList extends Component<IRouteListProps, IRouteListState> {
    state: IRouteListState;

    constructor(props: IRouteListProps) {
        super(props);
        this.state = {
            routes: this.props.routes
        };

        if (this.props.onRouteMixed) {
            this.props.onRouteMixed();
        }
    }

    render() {
        const { routes } = this.state;
        return (
            <div className="ui-route-list">
                <div className="ui-route-list__wrapper">
                    {
                        routes.map((route, index) => {
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