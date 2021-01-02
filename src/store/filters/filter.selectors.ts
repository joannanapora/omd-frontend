import { createSelector } from 'reselect';

const setUserFilters = state => state.user;

export const selectUserFilters = createSelector(
    [setUserFilters],
    (filters) => filters.currentFilters);