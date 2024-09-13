import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import RootConstants from "~/constants/root.constants";
import type { RootState } from "~/store/store";
import { loadFromLocalStorage, removeFromLocalStorage } from "~/utils/utils";

export interface ISocialItem {
	id: string;
	link: string;
	isShow: boolean;
}

export interface ContactsState {
	isSocials: boolean;
	location: string;
	email: string;
	phone: string;
	linkedIn: string;
	data: ISocialItem[];
}

const defaultContactsState = {
	isSocials: true,
	location: "Ukraine",
	email: "hello@example.com",
	phone: "001122334455",
	linkedIn: "https://www.linkedin.com/",
	data: [
		{
			id: "linkedIn",
			link: "https://www.linkedin.com/",
			isShow: true,
		},
		{
			id: "gitHub",
			link: "https://github.com/",
			isShow: true,
		},
		{
			id: "twitter",
			link: "https://twitter.com/",
			isShow: true,
		},
		{
			id: "facebook",
			link: "https://www.facebook.com/",
			isShow: true,
		},
		{
			id: "telegram",
			link: "https://t.me/",
			isShow: true,
		},
		{
			id: "gitLab",
			link: "https://gitlab.com/",
			isShow: false,
		},
		{
			id: "bitbucket",
			link: "https://bitbucket.org/",
			isShow: false,
		},
		{
			id: "slack",
			link: "https://slack.com/",
			isShow: false,
		},
		{
			id: "discord",
			link: "https://discord.com/",
			isShow: false,
		},
		{
			id: "codePen",
			link: "https://codepen.io/",
			isShow: false,
		},
		{
			id: "youTube",
			link: "https://www.youtube.com/",
			isShow: false,
		},
		{
			id: "instagram",
			link: "https://www.instagram.com/",
			isShow: false,
		},
		{
			id: "stackOverflow",
			link: "https://stackoverflow.co/",
			isShow: false,
		},
		{
			id: "reddit",
			link: "https://www.reddit.com/",
			isShow: false,
		},
		{
			id: "whatsApp",
			link: "https://www.whatsapp.com/",
			isShow: false,
		},
		{
			id: "weChat",
			link: "https://www.wechat.com/",
			isShow: false,
		},
	],
};
const initialState: ContactsState =
	loadFromLocalStorage(RootConstants.Contacts) || defaultContactsState;

const contactsSlice = createSlice({
	name: RootConstants.Contacts,
	initialState,
	reducers: {
		setContacts(state, action: PayloadAction<Partial<ContactsState>>) {
			return {
				...state,
				...action.payload,
			};
		},
		setIsSocials(state, action: PayloadAction<boolean>) {
			state.isSocials = action.payload;
		},
		setContactsData(state, action: PayloadAction<ISocialItem[]>) {
			state.data = action.payload;
		},
		setDefaultContactsState() {
			removeFromLocalStorage(RootConstants.Contacts);
			return defaultContactsState;
		},
	},
});

export const {
	setContacts,
	setIsSocials,
	setContactsData,
	setDefaultContactsState,
} = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
