import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store.ts';
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../utils/localStorage.ts';

interface ContactState {
    isSocial: boolean;
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    telegram: string;
}

const defaultContactState =  {
    isSocial: true,
    location: 'Ukraine',
    email: 'hello@example.com',
    phone: '001122334455',
    github: 'https://github.com/ToyLess78',
    linkedin: 'https://www.linkedin.com',
    telegram: 'https://t.me/JATly'
}
const initialState: ContactState = loadFromLocalStorage('contact') || defaultContactState;

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContact(state, action: PayloadAction<Partial<ContactState>>) {
            const newState = {
                ...state,
                ...action.payload
            };
            saveToLocalStorage('contact', newState);
            return newState;
        },
        setIsSocial(state, action: PayloadAction<boolean>) {
            state.isSocial = action.payload;
            saveToLocalStorage('contact', state);
        },
        setDefaultContactState() {
            removeFromLocalStorage('contact');
            return defaultContactState;
        }
    }
});

export const { setContact, setIsSocial, setDefaultContactState } = contactSlice.actions;

export const selectContact = (state: RootState) => state.contact;

export default contactSlice.reducer;
