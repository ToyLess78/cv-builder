import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store.ts';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage.ts';

interface AsideState {
    skills: {
        title: string;
        data: string[];

    };
    additional: {
        isAdditional: boolean;
        title: string;
        data: string[];
    };
}

const defaultSkills = {
    title: 'skills',
    data: [
        'JavaScript (ES6+)',
        'Typescript',
        'React.js',
        'NodeJS',
        'ExpressJS',
        'Next.js',
        'HTML5',
        'CSS3',
        'Git'
    ]
}

const defaultAdditional = {
    isAdditional: true,
    title: 'additional',
    data: [
        'Redux Toolkit',
        'RTK Query',
        'REST API',
        'WebSocket',
        'CI/CD',
        'CSCC',
        'BEM'
    ]
}

const initialState: AsideState = loadFromLocalStorage('aside') ||  {
    skills: defaultSkills,
    additional: defaultAdditional
};

const asideSlice = createSlice({
    name: 'aside',
    initialState,
    reducers: {
        setIsAdditional(state, action: PayloadAction<boolean>) {
            state.additional.isAdditional = action.payload;
            saveToLocalStorage('aside', state);
        },
        setSkills(state, action: PayloadAction<string[]>) {
            state.skills.data = action.payload;
            saveToLocalStorage('aside', state);
        },
        setAdditional(state, action: PayloadAction<Partial<AsideState['additional']>>) {
            state.additional = { ...state.additional, ...action.payload };
            saveToLocalStorage('aside', state);
        },
        setDefaultSkills(state) {
            state.skills = defaultSkills;
            saveToLocalStorage('aside', state);
        },
        setDefaultAdditional(state) {
            state.additional = defaultAdditional;
            saveToLocalStorage('aside', state);
        }
    }
});

export const { setAdditional, setIsAdditional, setSkills, setDefaultSkills, setDefaultAdditional } = asideSlice.actions;

export const selectAside = (state: RootState) => state.aside;

export default asideSlice.reducer;
