import { IMapState } from "./map.types";
import { Reducer, AnyAction } from 'redux';

export const MAP_INITIAL_STATE: IMapState = {
    places: []
}


const mapReducer: Reducer<IMapState, AnyAction> = (state = MAP_INITIAL_STATE, action) => {
    return state;
}

export default mapReducer;