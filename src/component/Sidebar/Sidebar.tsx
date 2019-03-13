import React, { Component } from 'react';
import { IPlace } from "../../types";

interface ISidebarProps {
    places?: IPlace[]
    searchAddress: (address: string) => void
    deletePlace: (place: IPlace) => void
}

interface ISidebarState {
    places: IPlace[]
    searchValue: string
}

export default class Sidebar extends Component<ISidebarProps, ISidebarState> {
    constructor(props: ISidebarProps) {
        super(props);
        this.state = {
            places: props.places || [],
            searchValue: 'Баксан, Тамбиева 207'
        };
    }

    private onLocationChange(event: React.FormEvent<HTMLInputElement>) {
        const safeSearchingLocation: string = event.currentTarget.value;
        this.setState({
            searchValue: safeSearchingLocation
        });
    }

    handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            const { searchValue } = this.state;
            this.props.searchAddress(searchValue);
        }
    }

    render() {
        const { places, searchValue } = this.state;
        return (
            <div className="ui-sidebar">
                <div className="ui-sidebar__wrapper">
                    <div className="ui-sidebar__header">
                        <h2>Route Details</h2>
                        <input type="text" onChange={e => this.onLocationChange(e) } value={searchValue} onKeyPress={ e => this.handleKeyPress(e) }/>
                        <div className="ui-route-list">
                            <div className="ui-route-list__wrapper">
                                {
                                    places.map((place, index) => {
                                        return (
                                            <div key={index} title={`Точка маршрута ${index + 1}`}>
                                                <input type="text" readOnly value={place.name} /> 
                                                <span onClick={() => this.props.deletePlace(place)}>
                                                    x
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="ui-sidebar__body">

                    </div> 
                </div>
            </div>
        )
    }
}