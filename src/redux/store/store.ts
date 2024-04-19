import { configureStore } from '@reduxjs/toolkit';
import infoReducer from '~/slices/infoSlice';
import asideReducer from '~/slices/skillsSlice';
import languagesReducer from '~/slices/languagesSlice';
import certificatesReducer from '~/slices/certificatesSlice';
import contactReducer from '~/slices/contactSlice';
import themeReducer  from '~/slices/themeSlice';
import editReducer from '~/slices/editSlice';

export const store = configureStore({
    reducer: {
        info: infoReducer,
        skills: asideReducer,
        languages: languagesReducer,
        certificates: certificatesReducer,
        contact: contactReducer,
        theme: themeReducer,
        edit: editReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;