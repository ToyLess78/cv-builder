import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store.ts';

interface InfoState {
    name: string;
    position: string;
    title: string;
    introduction: string;
}

const initialState: InfoState = {
    name: 'Your Name',
    position: 'Trainee JavaScript Developer',
    title: 'about',
    introduction: 'As a burgeoning developer embarking on the initial phases of my journey, I am fervently driven to bolster my skills and expertise. I recognize *COMPANY* as a pivotal platform that aligns seamlessly with my aspirations in the field of development. My unyielding conviction lies in the belief that the realm of coding presents an array of untapped opportunities for me to delve into and adeptly conquer.'
};

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo(state, action: PayloadAction<Partial<InfoState>>) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const { setInfo } = infoSlice.actions;

export const selectInfo = (state: RootState) => state.info;

export default infoSlice.reducer