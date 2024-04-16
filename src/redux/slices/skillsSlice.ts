import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage, saveToLocalStorage } from '~/utils/utils';

export interface IAdditionalState {
    isAdditional: boolean;
    title: string;
    data: string[];
}
export interface ISkillsState {
    title: string;
    data: string[];
}
export interface IAsideState {
    skills: ISkillsState;
    additional: IAdditionalState;
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
        'SCSS',
        'BEM'
    ]
}

const initialState: IAsideState = loadFromLocalStorage('skills') ||  {
    skills: defaultSkillsState,
    additional: defaultAdditionalState
};

const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        setIsAdditional(state, action: PayloadAction<boolean>) {
            state.additional.isAdditional = action.payload;
            saveToLocalStorage('skills', state);
        },
        setSkills(state, action: PayloadAction<Partial<IAsideState['skills']>>) {
            state.skills = { ...state.skills, ...action.payload };
            saveToLocalStorage('skills', state);
        },
        setAdditional(state, action: PayloadAction<Partial<IAsideState['additional']>>) {
            state.additional = { ...state.additional, ...action.payload };
            saveToLocalStorage('skills', state);
        },
        setDefaultSkills(state) {
            state.skills = defaultSkillsState;
            saveToLocalStorage('skills', state);
        },
        setDefaultAdditional(state) {
            state.additional = defaultAdditionalState;
            saveToLocalStorage('skills', state);
        }
    }
});

export const { setAdditional, setIsAdditional, setSkills, setDefaultSkills, setDefaultAdditional } = skillsSlice.actions;

export const selectSkills = (state: RootState) => state.skills;

export default skillsSlice.reducer;
