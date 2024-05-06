import { loadFromLocalStorage } from '~/utils/local-storage.utills';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';

export interface IProject {
    id: string;
    projectName: string;
    link: string;
    isLink: boolean;
    duration: string;
    isDuration: boolean;
    isYear: boolean;
    isPresent: boolean;
    technologies: string[];
    type: string;
    description: string
}

interface IProjectsState {
    title: string;
    editedId: string;
    isProjects: boolean;
    data: IProject[];
}

const initialState: IProjectsState = loadFromLocalStorage('projects') || {
    title: 'projects',
    editedId: '',
    isProjects: true,
    data: [
        {
            id: 'PodcastPlatform',
            projectName: 'Podcast Platform',
            link: 'http://localhost:5173/',
            isLink: true,
            duration: '',
            isDuration: false,
            isYear: true,
            isPresent: false,
            technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Objection', 'WebRTC'],
            type: 'personal project',
            description: '<p>A platform for recording, storing, and supporting podcasts. The solution allows you to record a podcast in real time (people can go in and comment on the podcast while recording). Users can create favorite podcast lists, leave comments and likes. A private podcast option is also available.</p>'
        },
        {
            id: 'FundraisingPlatform',
            projectName: 'Fundraising Platform',
            link: '',
            isLink: false,
            duration: 'Aug 2007 - Nov 2010',
            isDuration: true,
            isYear: false,
            isPresent: false,
            technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'TypeORM'],
            type: 'team project',
            description: '<p>This platform helps people create their own fundraising projects and attract sponsors. The user can support somebody’s idea and donate towards its realization. There are several features such as recommendations for project authors and sponsors, statistics on top themes, diagrams of hype <a href="http://localhost:5173/">dynamic on certain</a> themes, information about related projects and their current state, and many more.</p>'
        }
    ]
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Partial<IProjectsState>>) {
            return {
                ...state,
                ...action.payload
            };
        },
        setEditedProjectId(state, action: PayloadAction<string>) {
            state.editedId = action.payload;
        },
        setIsProjects(state, action: PayloadAction<boolean>) {
            state.isProjects = action.payload;
        },
        setEditedProject(state, action: PayloadAction<{project: Partial<IProject>}>) {
            const { project } = action.payload;

            const existingProjectIndex = state.data.findIndex(pro => pro.id === project.id);

            if (existingProjectIndex !== -1) {
                state.data = state.data.map(pro => {
                    if (pro.id === project.id) {
                        return {
                            ...pro,
                            ...project
                        };
                    }
                    return pro;
                });
            } else {
                state.data.push(project as IProject);
            }
        },
        removeProject(state, action: PayloadAction<string>) {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        addProject(state, action: PayloadAction<IProject>) {
            state.data = [...state.data, action.payload];
        }
    }
});

export const { setProjects, setEditedProjectId, setEditedProject, addProject, setIsProjects, removeProject} = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects;

export default projectsSlice.reducer;