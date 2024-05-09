import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage } from '~/utils/utils';
import RootConstants from '~/constants/root.constants';

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
    title: RootConstants.Skills,
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

const initialState: IAsideState = loadFromLocalStorage(RootConstants.Skills) ||  {
    skills: defaultSkillsState,
    additional: defaultAdditionalState
};

const skillsSlice = createSlice({
    name: RootConstants.Skills,
    initialState,
    reducers: {
        setIsAdditional(state, action: PayloadAction<boolean>) {
            state.additional.isAdditional = action.payload;
        },
        setSkills(state, action: PayloadAction<Partial<IAsideState[RootConstants.Skills]>>) {
            state.skills = { ...state.skills, ...action.payload };
        },
        setAdditional(state, action: PayloadAction<Partial<IAsideState[RootConstants.Additional]>>) {
            state.additional = { ...state.additional, ...action.payload };
        },
        setDefaultSkills(state) {
            state.skills = defaultSkillsState;
        },
        setDefaultAdditional(state) {
            state.additional = defaultAdditionalState;
        }
    }
});

export const { setAdditional, setIsAdditional, setSkills, setDefaultSkills, setDefaultAdditional } = skillsSlice.actions;

export const selectSkills = (state: RootState) => state.skills;

export default skillsSlice.reducer;
