import { IPlace } from "../../types";

export const APPEND_NEW_PLACE: string = '@@map/APPEND_NEW_PLACE';

export const REMOVE_PLACE_FROM_STACK: string = '@@map/REMOVE_PLACE_FROM_STACK';

export interface IMapState {
    places: IPlace[]
}