import React, { Component } from 'react';
import { RouteList, IRoute } from '../RouteList/RouteList';
import { searchAddress } from '../../util/map.client';

const initialRoutes: IRoute[] = [];

interface ISidebarProps {
    routes?: IRoute[]
}

interface ISidebarState {
    routes: IRoute[]
    searchValue: string
}

export default class Sidebar extends Component<ISidebarProps, ISidebarState> {
    routes: IRoute[] = []
    constructor(props: ISidebarProps) {
        super(props);
        this.routes = this.props.routes || initialRoutes

        this.state = {
            routes: this.routes,
            searchValue: 'Баксан, Тамбиева 207'
        };
    }

    private routeListMixed() {

    }

    private onLocationChange(event: React.FormEvent<HTMLInputElement>) {
        const safeSearchingLocation: string = event.currentTarget.value;
        this.setState({
            searchValue: safeSearchingLocation
        });
    }

    private async searchLocation() {
        const address = this.state.searchValue;
        try {
            let response = await searchAddress(address);
            let route: IRoute = {
                name: response.formattedAddress,
                location: response.location
            }
            this.routes.push(route);
            this.setState({
                routes: this.routes
            });
        } catch(e) {
            console.log(e);
        }
    }

    handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
           this.searchLocation();
        }
    }

    render() {
        const { routes, searchValue } = this.state;
        return (
            <div className="ui-sidebar">
                <div className="ui-sidebar__wrapper">
                    <div className="ui-sidebar__header">
                        <h2>Route Details</h2>
                        <input type="text" onChange={e => this.onLocationChange(e) } value={searchValue} onKeyPress={ e => this.handleKeyPress(e) }/>
                        <RouteList routes={routes} onRouteMixed={this.routeListMixed.bind(this)}/>
                    </div>
                    <div className="ui-sidebar__body">

                    </div> 
                </div>
            </div>
        )
    }
}