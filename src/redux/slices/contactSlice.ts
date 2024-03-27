import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store.ts';

interface ContactState {
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    telegram: string;
}

const initialState: ContactState = {
    location: 'Ukraine',
    email: 'hello@example.com',
    phone: '001122334455',
    github: 'https://github.com/ToyLess78',
    linkedin: 'https://www.linkedin.com',
    telegram: 'https://t.me/JATly'
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContact(state, action: PayloadAction<Partial<ContactState>>) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const { setContact } = contactSlice.actions;

export const selectContact = (state: RootState) => state.contact;

export default contactSlice.reducer;
