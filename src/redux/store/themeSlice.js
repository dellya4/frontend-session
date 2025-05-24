import { createSlice } from '@reduxjs/toolkit';

// Slice for manage theme interface
const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'light', // At the beginning theme is light
    },
    reducers: { // Action for set new theme
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;