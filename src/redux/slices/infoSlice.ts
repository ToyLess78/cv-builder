import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { loadFromLocalStorage, saveToLocalStorage } from '~/utils/local-storage.utills';

interface InfoState {
    firstname: string;
    lastname: string;
    position: string;
    title: string;
    summary: string;
}

const initialState: InfoState = loadFromLocalStorage('info') || {
    firstname: 'Your',
    lastname: 'Name',
    position: 'Web Developer',
    title: 'summary',
    summary: '<p>Experienced web developer adept in all stages of advanced web development. Knowledgeable in user interface, testing, and debugging processes. Bringing forth expertise in design, installation, testing and maintenance of web systems. Equipped with a diverse and promising skill-set. Proficient in an assortment of technologies, including Java, ASP.NET, C#, IIS, Tomcat, and Microsoft SQL Server. Able to effectively self-manage during independent projects, as well as collaborate in a team setting.</p>'
};

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo(state, action: PayloadAction<Partial<InfoState>>) {
            const newState = {
                ...state,
                ...action.payload
            };
            saveToLocalStorage('info', newState);
            return newState;
        }
    }
});

export const { setInfo } = infoSlice.actions;

export const selectInfo = (state: RootState) => state.info;

export default infoSlice.reducer