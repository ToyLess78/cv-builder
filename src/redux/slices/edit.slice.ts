import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import RootConstants from "~/constants/root.constants";
import type { RootState } from "~/store/store";

interface EditState {
	isEdit: string;
}

const initialState: EditState = {
	isEdit: "",
};

export const editSlice = createSlice({
	name: RootConstants.Edit,
	initialState,
	reducers: {
		setIsEdit(state, action: PayloadAction<string>) {
			state.isEdit = action.payload;
		},
	},
});

export const { setIsEdit } = editSlice.actions;
export const selectIsEdit = (state: RootState) => state.edit.isEdit;

export default editSlice.reducer;
