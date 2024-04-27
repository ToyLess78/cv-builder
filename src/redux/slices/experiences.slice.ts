import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage } from '~/utils/local-storage.utills';

interface Experience {
    id: string;
    duration: string;
    isYear: boolean;
    employer: string;
    jobTitle: string;
    location: string;
    description: string
}
interface ExperiencesState {
    title: string;
    editedId: string;
    isExperiences: boolean;
    data: Experience[];
}

const initialState: ExperiencesState = loadFromLocalStorage('experiences') || {
    title: 'work experience',
    editedId: '',
    isExperiences: true,
    data: [
        {
            id: '31T22:00:00.000Z',
            duration: 'Aug 2024',
            isYear: false,
            employer: 'Food & Delivery',
            jobTitle: 'Web Developer',
            location: 'Remote, California',
            description: '<ul><li>Planned, developed, tested, deployed, and maintained web applications.</li><li>Provided effective troubleshooting and remediation for web applications.</li> <li>Effectively translated client requirements into application designs and systems requirements.</li></ul>'
        },
        {
            id: '30T21:00:00.000Z',
            duration: [
                'Jan 2023',
                'Jun 2024'
            ],
            isYear: false,
            employer: 'City Group Bank',
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
        setExperiences(state, action: PayloadAction<Partial<ExperiencesState>>) {
            return {
                ...state,
                ...action.payload
            };
        },
        setEditedId(state, action: PayloadAction<string>) {
            state.editedId = action.payload;
        },
        setIsExperiences(state, action: PayloadAction<boolean>) {
            state.isExperiences = action.payload;
        },
        setEditedExperience(state, action: PayloadAction<{experience: Partial<Experience>}>) {
            state.data = state.data.map(exp => {
                if (exp.id === action.payload.experience.id) {
                    return {
                        ...exp,
                        ...action.payload.experience
                    };
                }
                return exp;
            });
        },
        addExperience(state, action: PayloadAction<Experience>) {
            state.data = [...state.data, action.payload];
        }
    }
});

export const { setExperiences, setEditedId, setEditedExperience, addExperience, setIsExperiences} = experiencesSlice.actions;

export const selectExperiences = (state: RootState) => state.experiences;

export default experiencesSlice.reducer