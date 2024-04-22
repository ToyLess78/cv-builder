import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '~/utils/utils';

interface ILanguagesState {
        isLanguages: boolean,
        data: ILanguage[]
}

export interface IItems {
    name: string;
    code: string;
}

export interface ILanguage {
    id: string;
    language: IItems | null;
    level: IItems | null;
}

const defaultLanguages = {
    isLanguages: true,
    data:
        [
            {
                id: 'id2613.0.2',
                language: {
                    code: 'en',
                    name: 'English'
                },
                level: {
                    name: 'Intermediate',
                    code: 'B1'
                }
            },
            {
                id: 'id2913.0.2',
                language: {
                    code: 'uk',
                    name: 'Ukrainian'
                },
                level: {
                    name: 'Native',
                    code: 'N'
                }
            },
            {
                id: 'id2763.0.2',
                language: {
                    code: 'ru',
                    name: 'Russian'
                },
                level: {
                    name: 'Advanced',
                    code: 'C1'
                }
            },
        ]
}

const initialState: ILanguagesState = loadFromLocalStorage('languages') || defaultLanguages;

const languagesSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        setLanguages(state, action: PayloadAction<Partial<ILanguagesState>>) {
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
        },
        setLanguagesData(state, action: PayloadAction<ILanguage[]>) {
            state.data = action.payload;
            saveToLocalStorage('languages', state);
        },
    }
});

export const { setLanguages, setLanguagesData, setIsLanguages, setDefaultLanguages } = languagesSlice.actions;

export const selectLanguages = (state: RootState) => state.languages;

export default languagesSlice.reducer;
