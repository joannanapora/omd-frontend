import { FilterActionTypes } from './filter.types';


export const setUserFilters = filter => ({
    type: FilterActionTypes.SET_USER_FILTERS,
    payload: filter
});
