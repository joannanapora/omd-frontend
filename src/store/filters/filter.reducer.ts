import { FilterActionTypes } from './filter.types';

interface IState {
    currentFilters: {
        dogName: string;
        owner: string;
        location: string;
        breed: string;
        date: string;
        weight: string;
    }
}

const INITIAL_STATE: IState = {
    currentFilters: null
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