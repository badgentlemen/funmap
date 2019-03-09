import React from 'react';
import ReactDOM from 'react-dom';
import HomeLayout from './HomeLayout';

const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.render(<HomeLayout />, rootElement);
}

