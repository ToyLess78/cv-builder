import { configureStore } from '@reduxjs/toolkit';
import infoReducer from '../slices/infoSlice.ts';
import asideReducer from '../slices/asideSlice.ts';
import languagesReducer from '../slices/languagesSlice.ts';
import certificatesReducer from '../slices/certificatesSlice.ts';
import contactReducer from '../slices/contactSlice.ts';

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