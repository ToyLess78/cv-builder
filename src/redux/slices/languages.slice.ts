import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import RootConstants from "~/constants/root.constants";
import type { RootState } from "~/store/store";
import { loadFromLocalStorage, removeFromLocalStorage } from "~/utils/utils";

interface ILanguagesState {
	isLanguages: boolean;
	data: ILanguage[];
}

export interface IItems {
	name: string;
	code: string;
}

export interface ILanguage {
	id: string;
	language: IItems | null;
	level: IItems | null;
}

const defaultLanguages = {
	isLanguages: true,
	data: [
		{
			id: "id2613.0.2",
			language: {
				code: "en",
				name: "English",
			},
			level: {
				name: "Intermediate",
				code: "B1",
			},
		},
		{
			id: "id2913.0.2",
			language: {
				code: "uk",
				name: "Ukrainian",
			},
			level: {
				name: "Native",
				code: "N",
			},
		},
		{
			id: "id2763.0.2",
			language: {
				code: "ru",
				name: "Russian",
			},
			level: {
				name: "Advanced",
				code: "C1",
			},
		},
	],
};

const initialState: ILanguagesState =
	loadFromLocalStorage(RootConstants.Languages) || defaultLanguages;

const languagesSlice = createSlice({
	name: RootConstants.Languages,
	initialState,
	reducers: {
		setLanguages(state, action: PayloadAction<Partial<ILanguagesState>>) {
			return {
				...state,
				...action.payload,
			};
		},
		setIsLanguages(state, action: PayloadAction<boolean>) {
			state.isLanguages = action.payload;
		},
		setDefaultLanguages() {
			removeFromLocalStorage(RootConstants.Languages);
			return defaultLanguages;
		},
		setLanguagesData(state, action: PayloadAction<ILanguage[]>) {
			state.data = action.payload;
		},
	},
});

export const {
	setLanguages,
	setLanguagesData,
	setIsLanguages,
	setDefaultLanguages,
} = languagesSlice.actions;

export const selectLanguages = (state: RootState) => state.languages;

export default languagesSlice.reducer;
