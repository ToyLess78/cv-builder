import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage } from '~/utils/local-storage.utills';

export interface IExperience {
    id: string;
    duration: string;
    isYear: boolean;
    isPresent: boolean;
    employer: string;
    jobTitle: string;
    location: string;
    description: string
}
interface IExperiencesState {
    title: string;
    editedId: string;
    isExperiences: boolean;
    data: IExperience[];
}

const initialState: IExperiencesState = loadFromLocalStorage('experiences') || {
    title: 'experience',
    editedId: '',
    isExperiences: true,
    data: [
        {
            id: '31T22:00:00.000Z',
            duration: 'Aug 2024 - Present',
            isYear: false,
            isPresent: true,
            employer: 'Food & Delivery',
            jobTitle: 'Web Developer',
            location: 'Remote, California',
            description: '<ul><li>Planned, developed, tested, deployed, and maintained web applications.</li><li>Provided effective troubleshooting and remediation for web applications.</li> <li>Effectively translated client requirements into application designs and systems requirements.</li></ul>'
        },
        {
            id: '30T21:00:00.000Z',
            duration: 'Jan 2023 - Jun 2024',
            isYear: false,
            isPresent: false,
            employer: 'Bank City Group',
            jobTitle: 'Junior Web Developer',
            location: 'Kyiv, Ukraine',
            description: '<ul><li>Managed front-end and back-end development in the company\'s Portfolio Analyst, Employee Track, and Account Management systems.</li><li>Successfully identified, diagnosed, and fixed website problems, including broken links, typographical errors, and formatting issues.</li><li>Helped to achieve a consistent look and visual theme across the website by promoting uniform fonts, formatting, images, and layout.</li></ul>'
        }
    ]
};

const experiencesSlice = createSlice({
    name: 'experiences',
    initialState,
    reducers: {
        setExperiences(state, action: PayloadAction<Partial<IExperiencesState>>) {
            return {
                ...state,
                ...action.payload
            };
        },
        setEditedExperienceId(state, action: PayloadAction<string>) {
            state.editedId = action.payload;
        },
        setIsExperiences(state, action: PayloadAction<boolean>) {
            state.isExperiences = action.payload;
        },
        setEditedExperience(state, action: PayloadAction<{experience: Partial<IExperience>}>) {
            const { experience } = action.payload;

            const existingExperienceIndex = state.data.findIndex(exp => exp.id === experience.id);

            if (existingExperienceIndex !== -1) {
                state.data = state.data.map(exp => {
                    if (exp.id === experience.id) {
                        return {
                            ...exp,
                            ...experience
                        };
                    }
                    return exp;
                });
            } else {
                state.data.push(experience as IExperience);
            }
        },
        removeExperience(state, action: PayloadAction<string>) {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        addExperience(state, action: PayloadAction<IExperience>) {
            state.data = [...state.data, action.payload];
        }
    }
});

export const { setExperiences, setEditedExperienceId, setEditedExperience, addExperience, setIsExperiences, removeExperience} = experiencesSlice.actions;

export const selectExperiences = (state: RootState) => state.experiences;

export default experiencesSlice.reducer;