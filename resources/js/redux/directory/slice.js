import { createSlice } from '@reduxjs/toolkit';

export const directorySlice = createSlice({
    name: 'directory',
    initialState: {
        data: {
            categories: [],
            themes: [],
        }
    },
    reducers: {
        setDirectories: (state, action) => {
            state.data.categories = action.payload.categories;
            state.data.themes = action.payload.themes;
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setDirectories } = directorySlice.actions;
export const { reducer: directoryReducer } = directorySlice;
