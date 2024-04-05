import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';

interface EditeState {
    isEdite: string;
}

const initialState: EditeState = {
    isEdite: ''
};

export const editeSlice = createSlice({
    name: 'edite',
    initialState,
    reducers: {
        setIsEdite(state, action: PayloadAction<string>) {
            state.isEdite = action.payload;
        }
    }
});

export const { setIsEdite } = editeSlice.actions;
export const selectIsEdite = (state: RootState) => state.edite.isEdite;

export default editeSlice.reducer;
