import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage, saveToLocalStorage } from '~/utils/utils';

interface Certificate {
    id: string;
    title: string;
    issue: string;
    link: string;
}

interface CertificatesState {
    isCertificates: boolean;
    title: string;
    data: Certificate[];
}

const defaultCertificates = {
    isCertificates: true,
    title: 'certificates',
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
            issue: "Udemy",
            link: "https://www.udemy.com/certificate/UC-ef47402f-9686-4f79-a2c3-84528ccbc79a/",
        }
    ]
};
const initialState: CertificatesState = loadFromLocalStorage('certificates') || defaultCertificates;

const certificatesSlice = createSlice({
    name: 'certificates',
    initialState,
    reducers: {
        setCertificates(state, action: PayloadAction<Partial<CertificatesState>>) {
            const newState = {
                ...state,
                ...action.payload
            };
            saveToLocalStorage('certificates', newState);
            return newState;
        },
        setIsCertificates(state, action: PayloadAction<boolean>) {
            state.isCertificates = action.payload;
            saveToLocalStorage('certificates', state);
        },
        setDefaultCertificates(state) {
            state = defaultCertificates;
            saveToLocalStorage('certificates', state);
        }
    }
});

export const { setCertificates, setIsCertificates, setDefaultCertificates } = certificatesSlice.actions;

export const selectCertificates = (state: RootState) => state.certificates;

export default certificatesSlice.reducer;
