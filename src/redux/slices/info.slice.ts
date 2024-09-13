import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import RootConstants from "~/constants/root.constants";
import type { RootState } from "~/store/store";
import { loadFromLocalStorage } from "~/utils/local-storage.utills";

interface InfoState {
	firstname: string;
	lastname: string;
	position: string;
	title: string;
	summary: string;
}

const initialState: InfoState = loadFromLocalStorage(RootConstants.Info) || {
	firstname: "Name",
	lastname: "Surname",
	position: "Web Developer",
	title: "summary",
	summary:
		"<p>Experienced web developer adept in all stages of advanced web development. Knowledgeable in user interface, testing, and debugging processes. Bringing forth expertise in design, installation, testing and maintenance of web systems. Equipped with a diverse and promising skill-set. Proficient in an assortment of technologies, including Typescript, React.js, NodeJS, ExpressJS, Next.js, and WebSocket. Able to effectively self-manage during independent projects, as well as collaborate in a team setting.</p>",
};

const infoSlice = createSlice({
	name: RootConstants.Info,
	initialState,
	reducers: {
		setInfo(state, action: PayloadAction<Partial<InfoState>>) {
			return {
				...state,
				...action.payload,
			};
		},
	},
});

export const { setInfo } = infoSlice.actions;

export const selectInfo = (state: RootState) => state.info;

export default infoSlice.reducer;
