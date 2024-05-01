import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage } from '~/utils/local-storage.utills';

export interface IEducation {
    id: string;
    duration: string;
    isYear: boolean;
    isPresent: boolean;
    school: string;
    degree: string;
    location: string;
    description: string
}
interface EducationState {
    title: string;
    editedId: string;
    isEducation: boolean;
    data: IEducation[];
}

const initialState: EducationState = loadFromLocalStorage('education') || {
    title: 'education',
    editedId: '',
    isEducation: true,
    data: [
        {
            id: '31T22000000Z',
            duration: 'Aug 2011 - Aug 2015',
            isYear: false,
            isPresent: false,
            school: 'Pepperdine University',
            degree: 'Master of Computer Science',
            location: 'California',
            description: '<ul><li>Completed Master of Computer Science degree from Pepperdine University in California.</li></ul>'
        },
        {
            id: '30T210000sddZ',
            duration: 'Aug 2007 - Nov 2010',
            isYear: false,
            isPresent: false,
            school: 'University of California at Los Angeles',
            degree: 'Bachelor of Computer Science',
            location: 'Los Angeles',
            description: `<ul><li>Graduated with a Bachelor's degree in Computer Science from the University of California at Los Angeles.</li></ul>`
        }
    ]
};

const educationSlice = createSlice({
    name: 'education',
    initialState,
    reducers: {
        setEducation(state, action: PayloadAction<Partial<EducationState>>) {
            return {
                ...state,
                ...action.payload
            };
        },
        setEditedEducationId(state, action: PayloadAction<string>) {
            state.editedId = action.payload;
        },
        setIsEducation(state, action: PayloadAction<boolean>) {
            state.isEducation = action.payload;
        },
        setEditedEducation(state, action: PayloadAction<{education: Partial<IEducation>}>) {
            const { education } = action.payload;

            const existingEducationIndex = state.data.findIndex(ed => ed.id === education.id);

            if (existingEducationIndex !== -1) {
                state.data = state.data.map(ed => {
                    if (ed.id === education.id) {
                        return {
                            ...ed,
                            ...education
                        };
                    }
                    return ed;
                });
            } else {
                state.data.push(education as IEducation);
            }
        },
        removeEducation(state, action: PayloadAction<string>) {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        addEducation(state, action: PayloadAction<IEducation>) {
            state.data = [...state.data, action.payload];
        }
    }
});

export const { setEducation, setEditedEducationId, setEditedEducation, addEducation, setIsEducation, removeEducation} = educationSlice.actions;

export const selectEducation = (state: RootState) => state.education;

export default educationSlice.reducer