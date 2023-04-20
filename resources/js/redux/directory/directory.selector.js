export const selectThemesState = (
    state
) => {
    return state.directory.data.themes;
};

export const selectCategoriesState = (
    state
) => {
    return state.directory.data.categories;
};
