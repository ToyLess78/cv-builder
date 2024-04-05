import { configureStore } from '@reduxjs/toolkit';
import infoReducer from '~/slices/infoSlice';
import asideReducer from '~/slices/asideSlice';
import languagesReducer from '~/slices/languagesSlice';
import certificatesReducer from '~/slices/certificatesSlice';
import contactReducer from '~/slices/contactSlice';
import themeReducer  from '~/slices/themeSlice';
import editeReducer from '~/slices/editeSlice';

export const store = configureStore({
    reducer: {
        info: infoReducer,
        aside: asideReducer,
        languages: languagesReducer,
        certificates: certificatesReducer,
        contact: contactReducer,
        theme: themeReducer,
        edite: editeReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;