import { FilterActionTypes } from './filter.types';

export interface IServiceFilters {
    dogName: string;
    location: number[];
    breed: string;
    dateFrom: string;
    dateTo: string;
    weight: number[];
    page: number;
    phoneNumber: string;
}

interface IState {
    currentFilters: IServiceFilters;
}

const INITIAL_STATE: IState = {
    currentFilters: { dogName: "", phoneNumber: "", breed: "", location: [], dateFrom: "", dateTo: "", weight: [], page: 1 }
}
const filtersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FilterActionTypes.SET_USER_FILTERS:
            return {
                ...state,
                currentFilters: { ...state.currentFilters, ...action.payload }
            }
        default:
            return state;
    }
}

export default filtersReducer;