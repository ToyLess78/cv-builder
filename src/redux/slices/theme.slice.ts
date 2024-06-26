import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CssColor } from '~/types/color.types';
import { RootState } from '~/store/store';
import TemplateConstants from '~/constants/template.constants';
import RootConstants from '~/constants/root.constants';
import { loadFromLocalStorage } from '~/utils/local-storage.utills';

interface IThemeState {
    color: CssColor | string | number;
    template: string;
}

const defaultThemeState: IThemeState = {
    color: 'rgba(25, 118, 210, 1)',
    template: TemplateConstants.Breeze
};

const initialState: IThemeState = loadFromLocalStorage(RootConstants.Theme) || defaultThemeState;

export const themeSlice = createSlice({
    name: RootConstants.Theme,
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
