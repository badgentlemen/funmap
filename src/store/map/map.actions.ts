import { action, ActionType } from 'typesafe-actions';
import { IPlace } from '../../types';
import { APPEND_NEW_PLACE, REMOVE_PLACE_FROM_STACK } from './map.types';

export const appendNewPlaceActon = (place: IPlace) => action(APPEND_NEW_PLACE, {
    place
});

export const removePlaceFrowStack = (place: IPlace) => action(REMOVE_PLACE_FROM_STACK, {
    id: 273
});

const actions = {
    append: appendNewPlaceActon,
    remove: removePlaceFrowStack
}

export type IMapActions = ActionType<typeof actions>
