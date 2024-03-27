import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store.ts';

interface LanguagesState {
    languages: {
        isLanguages: boolean,
        data: string[][]
    };
}

const initialState: LanguagesState = {
    languages:
        {
            isLanguages: true,
            data:
                [
                    ['English', 'Intermediate'],
                    ['Ukrainian', 'Native'],
                    ['Russian', 'Advanced']
                ]
        }
};

const languagesSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        setLanguages(state, action: PayloadAction<Partial<LanguagesState>>) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const { setLanguages } = languagesSlice.actions;

export const selectLanguages = (state: RootState) => state.languages.languages;

export default languagesSlice.reducer;
