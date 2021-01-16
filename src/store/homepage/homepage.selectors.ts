import { createSelector } from 'reselect';

const selectHomePage = state => state.homepage;

export const selectHomePageTabs = createSelector(
    [selectHomePage],
    homepage => homepage.tabs
)