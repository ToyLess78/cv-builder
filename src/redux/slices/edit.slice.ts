import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import RootConstants from '~/constants/root.constants';

interface EditState {
    isEdit: string;
}

const initialState: EditState = {
    isEdit: ''
};

export const editSlice = createSlice({
    name: RootConstants.Edit,
    initialState,
    reducers: {
        setIsEdit(state, action: PayloadAction<string>) {
            state.isEdit = action.payload;
        }
    }
});

export const { setIsEdit } = editSlice.actions;
export const selectIsEdit = (state: RootState) => state.edit.isEdit;

export default editSlice.reducer;
