import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CssColor } from '~/types/color-types';
import { RootState } from '~/store/store';

interface ThemeState {
    color: CssColor | string | number;
}

const initialState: ThemeState = {
    color: 'rgba(25, 118, 210, 1)'
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeColor(state, action: PayloadAction<string | CssColor>) {
            state.color = action.payload;
        }
    }
});

export const { setThemeColor } = themeSlice.actions;
export const selectThemeColor = (state: RootState) => state.theme.color;

export default themeSlice.reducer;
