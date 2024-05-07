import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CssColor } from '~/types/color-types';
import { RootState } from '~/store/store';

interface ThemeState {
    color: CssColor | string | number;
    template: string;
}

const initialState: ThemeState = {
    color: 'rgba(25, 118, 210, 1)',
    template: 'strong'
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeColor(state, action: PayloadAction<string | CssColor>) {
            state.color = action.payload;
        },
        setTemplate(state, action: PayloadAction<string>) {
            state.template = action.payload;
        }
    }
});

export const { setThemeColor, setTemplate } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
