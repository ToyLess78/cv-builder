import { configureStore } from '@reduxjs/toolkit';
import infoReducer from '~/slices/info.slice';
import asideReducer from '~/slices/skills.slice';
import languagesReducer from '~/slices/languages.slice';
import certificationsReducer from '~/slices/certifications.slice';
import contactReducer from '~/slices/contact.slice';
import themeReducer from '~/slices/theme.slice';
import editReducer from '~/slices/edit.slice';
import experienceReducer from '~/slices/experiences.slice';
import educationReducer from '~/slices/education.slice';
import projectsReducer from '~/slices/projects.slice';

type ReducerKey = keyof RootState;

const saveReducerStateToLocalStorage = <T>(reducerKey: ReducerKey, state: T) => {
    localStorage.setItem(reducerKey, JSON.stringify(state));
};

export const store = configureStore({
    reducer: {
        info: infoReducer,
        skills: asideReducer,
        languages: languagesReducer,
        certifications: certificationsReducer,
        contact: contactReducer,
        theme: themeReducer,
        edit: editReducer,
        experiences: experienceReducer,
        education: educationReducer,
        projects: projectsReducer
    }
});

let previousState = store.getState();

store.subscribe(() => {
    const currentState = store.getState();
    Object.entries(currentState).forEach(([reducerKey, reducerValue]) => {
        if (reducerKey !== 'edit' && reducerValue !== previousState[reducerKey as ReducerKey]) {
            saveReducerStateToLocalStorage(reducerKey as ReducerKey, reducerValue);
        }
    });
    previousState = currentState;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;