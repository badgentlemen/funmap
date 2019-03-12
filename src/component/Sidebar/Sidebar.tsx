import React, { Component } from 'react';
import Redux from 'redux';
import PlaceList from '../PlaceList';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/store';
import { IMapActions, appendNewPlaceActon } from '../../store/map/map.actions';
import { searchAddress } from '../../util/map.client';
import { IPlace } from '../../types';

interface ISidebarProps {
    places: IPlace[]
}

interface ISidebarDispatchProps {
    appendPlace: (place: IPlace) => void
}

interface ISidebarState {
    searchValue: string
}

class Sidebar extends Component<ISidebarProps & ISidebarDispatchProps, ISidebarState> {
    constructor(props: ISidebarProps & ISidebarDispatchProps) {
        super(props);
        this.state = {
            searchValue: ''
        };
    }

    private onLtInputChanged(event: React.FormEvent<HTMLInputElement>) {
        const safeSearchingLocation: string = event.currentTarget.value;
        this.setState({
            searchValue: safeSearchingLocation
        });
    }

    private async searchLocation() {
        const address = this.state.searchValue;
        try {
            let response = await searchAddress(address);
            let newPlace: IPlace = {
                name: response.formattedAddress,
                location: response.location
            }
            this.props.appendPlace(newPlace);
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
        const places  = this.props.places || [];
        const { searchValue } = this.state;
        return (
            <div className="ui-sidebar">
                <div className="ui-sidebar__wrapper">
                    <div className="ui-sidebar__header">
                        <h2>Route Details</h2>
                        <input type="text" onChange={e => this.onLtInputChanged(e) } value={searchValue} onKeyPress={ e => this.handleKeyPress(e) }/>
                        <PlaceList places={places} />
                    </div>
                    <div className="ui-sidebar__body">

                    </div> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState): ISidebarProps => ({
    places: state.map.places
})

const mapDispatchToProps = (dispatch: Redux.Dispatch<IMapActions>): ISidebarDispatchProps => ({
    appendPlace: (place) => dispatch(appendNewPlaceActon(place))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);