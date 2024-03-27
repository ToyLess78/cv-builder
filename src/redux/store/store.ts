import { configureStore } from '@reduxjs/toolkit';
import infoReducer from '../slices/infoSlice';
import asideReducer from '../slices/asideSlice';
import languagesReducer from '../slices/languagesSlice';
import certificatesReducer from '../slices/certificatesSlice';
import contactReducer from '../slices/contactSlice';

export const store = configureStore({
    reducer: {
        info: infoReducer,
        aside: asideReducer,
        languages: languagesReducer,
        certificates: certificatesReducer,
        contact: contactReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;