import { createSelector } from 'reselect';

const getFilterState = state => state.filter;

export const selectUserFilters = createSelector(
    [getFilterState],
    (filters) => filters.currentFilters);