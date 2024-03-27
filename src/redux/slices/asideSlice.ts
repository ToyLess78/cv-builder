import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

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

const defaultSkillsState = {
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

const defaultAdditionalState = {
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
    skills: defaultSkillsState,
    additional: defaultAdditionalState
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
            state.skills = defaultSkillsState;
            saveToLocalStorage('aside', state);
        },
        setDefaultAdditional(state) {
            state.additional = defaultAdditionalState;
            saveToLocalStorage('aside', state);
        }
    }
});

export const { setAdditional, setIsAdditional, setSkills, setDefaultSkills, setDefaultAdditional } = asideSlice.actions;

export const selectAside = (state: RootState) => state.aside;

export default asideSlice.reducer;
