import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage, removeFromLocalStorage } from '~/utils/utils';

export interface ICertificate {
    id: string;
    title: string;
    issue: string;
    link: string;
}

export interface ICertificationsState {
    isCertifications: boolean;
    title: string;
    data: ICertificate[];
}

const defaultCertifications = {
    isCertifications: true,
    title: 'certifications',
    data: [
        {
            id: "648sgvg2gfd",
            title: "React, React Router & Redux Toolkit",
            issue: "Udemy",
            link: "https://www.udemy.com/certificate/UC-6760c53d-b563-411c-af04-f760baad6e26/",
        },
        {
            id: "6486462gfd",
            title: "IT security: protection against digital cyber fraud",
            issue: "Google",
            link: "https://www.coursera.org/account/accomplishments/certificate/NUAE2JM7NCNZ",
        },
        {
            id: "64hhhtg2gfd",
            title: "JavaScript Algorithms and Data Structures",
            issue: "freeCodeCamp",
            link: "https://www.freecodecamp.org/certification/fccf30fb616-0d1f-4b9f-acad-6b570afb74c2a/javascript-algorithms-and-data-structures",
        },
        {
            id: "64gfg62gfd",
            title: "Layout and Creation of Websites from Scratch",
            issue: "LinkedIn",
            link: "https://www.linkedin.com/",
        }
    ]
};
const initialState: ICertificationsState = loadFromLocalStorage('certifications') || defaultCertifications;

const certificationsSlice = createSlice({
    name: 'certifications',
    initialState,
    reducers: {

        setCertificationsData(state, action: PayloadAction<ICertificate[]>) {
            state.data = action.payload;
        },
        setIsCertifications(state, action: PayloadAction<boolean>) {
            state.isCertifications = action.payload;
        },
        setDefaultCertifications() {
            removeFromLocalStorage('certifications');
            return defaultCertifications;
        }
    }
});

export const { setCertificationsData, setIsCertifications, setDefaultCertifications } = certificationsSlice.actions;

export const selectCertifications = (state: RootState) => state.certifications;

export default certificationsSlice.reducer;
