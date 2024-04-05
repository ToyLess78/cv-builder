import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '~/utils/utils';

interface ContactsState {
    isSocials: boolean;
    isGithub: boolean;
    isLinkedin: boolean;
    isTelegram: boolean;
    isTwitter: boolean;
    isFacebook: boolean;
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    telegram: string;
    twitter: string;
    facebook: string;
}

const defaultContactsState = {
    isSocials: true,
    isGithub: true,
    isLinkedin: true,
    isTelegram: true,
    isTwitter: true,
    isFacebook: true,
    location: 'Ukraine',
    email: 'hello@example.com',
    phone: '001122334455',
    github: 'https://github.com/ToyLess78',
    linkedin: 'https://www.linkedin.com',
    telegram: 'https://t.me/JATly',
    twitter: 'https://twitter.com/',
    facebook: 'https://www.facebook.com/'
}
const initialState: ContactsState = loadFromLocalStorage('contact') || defaultContactsState;

const contactsSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContacts(state, action: PayloadAction<Partial<ContactsState>>) {
            const newState = {
                ...state,
                ...action.payload
            };
            saveToLocalStorage('contact', newState);
            return newState;
        },
        setIsSocials(state, action: PayloadAction<boolean>) {
            state.isSocials = action.payload;
            saveToLocalStorage('contact', state);
        },
        setIsGithub(state, action: PayloadAction<boolean>) {
            state.isGithub = action.payload;
            saveToLocalStorage('contact', state);
        },
        setIsLinkedin(state, action: PayloadAction<boolean>) {
            state.isLinkedin = action.payload;
            saveToLocalStorage('contact', state);
        },
        setIsTelegram(state, action: PayloadAction<boolean>) {
            state.isTelegram = action.payload;
            saveToLocalStorage('contact', state);
        },
        setIsTwitter(state, action: PayloadAction<boolean>) {
            state.isTwitter = action.payload;
            saveToLocalStorage('contact', state);
        },
        setIsFacebook(state, action: PayloadAction<boolean>) {
            state.isFacebook = action.payload;
            saveToLocalStorage('contact', state);
        },
        setDefaultContactsState() {
            removeFromLocalStorage('contact');
            return defaultContactsState;
        }
    }
});

export const {
    setContacts,
    setIsSocials,
    setDefaultContactsState,
    setIsGithub,
    setIsLinkedin,
    setIsTelegram,
    setIsTwitter,
    setIsFacebook
} = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contact;

export default contactsSlice.reducer;
