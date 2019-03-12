import { IMapState, APPEND_NEW_PLACE, REMOVE_PLACE_FROM_STACK } from "./map.types";
import { Reducer } from 'redux';
import { IMapActions, appendNewPlaceActon, removePlaceFrowStack } from "./map.actions";
import { ActionType } from "typesafe-actions";

export const MAP_INITIAL_STATE: IMapState = {
    places: [{
        name: 'улица проспект Ленина, 59, Нальчик, Кабардино-Балкарская Республика',
        location: {
            lat: 43.486987,
            lng: 43.609875
        }
    }]
}


const mapReducer: Reducer<IMapState, IMapActions> = (state = MAP_INITIAL_STATE, action): IMapState => {
    switch (action.type) {
        case APPEND_NEW_PLACE:
            action = action as ActionType<typeof appendNewPlaceActon>;

            const places = state.places;
            places.push(action.payload.place);

            return {
                ...state,
                places
            };
        case REMOVE_PLACE_FROM_STACK:
            action = action as ActionType<typeof removePlaceFrowStack>;

            return state;
        default: 
            return state;
    }
}

export default mapReducer;