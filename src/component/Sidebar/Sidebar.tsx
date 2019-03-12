import React, { Component } from 'react';
import { RouteList, IPlace } from '../RouteList/RouteList';

interface ISidebarProps {
    places?: IPlace[]
}

interface ISidebarState {
    places: IPlace[]
    searchValue: string
}

export default class Sidebar extends Component<ISidebarProps, ISidebarState> {
    
    constructor(props: ISidebarProps) {
        super(props);
        this.state = {
            places: this.props.places || [],
            searchValue: ''
        };
    }

    private routeListMixed() {

    }

    private locationSearch(event: React.FormEvent<HTMLInputElement>) {
        const safeSearchingLocation: string = event.currentTarget.value;
        this.setState({
            searchValue: safeSearchingLocation
        });
    }

    handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            const address = this.state.searchValue;
        }
    }

    render() {
        const { places: routes, searchValue } = this.state;
        return (
            <div className="ui-sidebar">
                <div className="ui-sidebar__wrapper">
                    <div className="ui-sidebar__header">
                        <h2>Route Details</h2>
                        <input type="text" onChange={e => this.locationSearch(e) } value={searchValue} onKeyPress={ e => this.handleKeyPress(e) }/>
                        <RouteList places={routes} onRouteMixed={this.routeListMixed.bind(this)}/>
                    </div>
                    <div className="ui-sidebar__body">

                    </div> 
                </div>
            </div>
        )
    }
}