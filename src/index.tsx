import React from 'react';
import ReactDOM from 'react-dom';
import HomeLayout from './HomeLayout';
import store from './store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

export const RootLayout = (
    <Provider store={store}>
        <HomeLayout />
    </Provider>
)

if (rootElement) {
    ReactDOM.render(RootLayout, rootElement);
}

