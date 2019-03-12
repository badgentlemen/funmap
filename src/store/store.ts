import { createStore, compose, Store, combineReducers } from 'redux';
import { IMapState } from './map/map.types';
import mapReducer from './map/map.reducer';

const composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface ApplicationState {
    map: IMapState
}

const rootReducer = combineReducers<ApplicationState>({
    map: mapReducer
});


const configureStore = (initialState?: ApplicationState) => {
    return createStore(rootReducer, initialState, composeEnhancers());
}

const store: Store<ApplicationState> = configureStore();

export default store;