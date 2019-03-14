import React, { Component } from 'react';
import { IPlace } from "../../types";

interface ISidebarProps {
    places?: IPlace[]
    searchAddress: (address: string) => void
    deletePlace: (place: IPlace) => void
    mixePlace?: (origin: number, destination: number) => void
}

interface ISidebarState {
    places: IPlace[];
    searchValue: string; 
}

export default class Sidebar extends Component<ISidebarProps, ISidebarState> {
    draggedPlaceIndex: number | null = null;
    constructor(props: ISidebarProps) {
        super(props);
        this.state = {
            places: props.places || [],
            searchValue: 'Баксан, Тамбиева 207',
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

    private onDragOver(event: React.DragEvent<HTMLUListElement>) {
        event.preventDefault();
    }

    private onPlaceDrag(event: React.DragEvent<HTMLLIElement>, index: number) {
        event.preventDefault();
        this.draggedPlaceIndex = index;
    }

    private onPlaceDrop(event: React.DragEvent<HTMLLIElement>, index: number) {
        this.props.mixePlace && 
            this.draggedPlaceIndex && 
                this.props.mixePlace(this.draggedPlaceIndex, index)
    }

    render() {
        const { places, searchValue } = this.state;
        return (
            <div className="ui-sidebar">
                <div className="ui-sidebar__wrapper">
                    <div className="ui-sidebar__header">
                        <h2>Route Details</h2>
                        <input type="text" onChange={e => this.onLocationChange(e)} value={searchValue} onKeyPress={e => this.handleKeyPress(e)} />
                        <ul className="ui-route-list" onDragOver={event => this.onDragOver(event)}>
                            {
                                places.map((place, index) => {
                                    return (
                                        <li key={index} className="ui-route-list__item" draggable={true} data-id={index} onDrag={event => this.onPlaceDrag(event, index)} onDrop={event => this.onPlaceDrop(event, index)}>
                                            <label>{place.name}</label>
                                            <span title={`Удалить маршрут "${place.name}"`} onClick={() => this.props.deletePlace(place)} className="delete-icon">
                                                x
                                            </span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="ui-sidebar__body">

                    </div>
                </div>
            </div>
        )
    }
}