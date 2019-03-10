import React, { Component } from 'react';
import MapBox from './component/Mapbox';
import Sidebar from './component/Sidebar';
import './app.css';

class HomeLayout extends Component {

    

    private renderBoard(): JSX.Element {
        return (
            <div className="HomeLayout__boardWrapper">
                <Sidebar />
            </div>
        )
    }

    private renderLayoutPage(): JSX.Element {
        return (
            <div className="HomeLayout__layoutPage">
                <MapBox/>
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
