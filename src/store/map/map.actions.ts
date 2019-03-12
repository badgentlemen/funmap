import { action, ActionType } from 'typesafe-actions';
import { IPlace } from '../../component/RouteList/RouteList';
import { APPEND_NEW_PLACE, REMOVE_PLACE_FROM_STACK } from './map.types';

export const appendNewPlaceActon = (place: IPlace) => action(APPEND_NEW_PLACE, {
    place
});

export const removePlaceFrowStack = (place: IPlace) => action(REMOVE_PLACE_FROM_STACK, {
    place
});

const actions = {
    append: appendNewPlaceActon,
    remove: removePlaceFrowStack
}

export type IMapActions = ActionType<typeof actions>
