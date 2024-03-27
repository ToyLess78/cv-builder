import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

interface LanguagesState {
        isLanguages: boolean,
        data: string[][]
}

const defaultLanguages = {
    isLanguages: true,
    data:
        [
            ['English', 'Intermediate'],
            ['Ukrainian', 'Native'],
            ['Russian', 'Advanced']
        ]
}

const initialState: LanguagesState = loadFromLocalStorage('languages') || defaultLanguages;

const languagesSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        setLanguages(state, action: PayloadAction<Partial<LanguagesState>>) {
            const newState = {
                ...state,
                ...action.payload
            };
            saveToLocalStorage('languages', newState);
            return newState;
        },
        setIsLanguages(state, action: PayloadAction<boolean>) {
            state.isLanguages = action.payload;
            saveToLocalStorage('languages', state);
        },
        setDefaultLanguages() {
            removeFromLocalStorage('languages');
            return defaultLanguages;
        }
    }
});

export const { setLanguages, setIsLanguages, setDefaultLanguages } = languagesSlice.actions;

export const selectLanguages = (state: RootState) => state.languages;

export default languagesSlice.reducer;
