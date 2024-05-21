import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';

const EditCertificates = lazy(() => import('~/components/modules/certifications/EditCertifications'));
const EditSummary = lazy(() => import('~/components/modules/header/EditSummary'));
const EditInfo = lazy(() => import('~/components/modules/header/EditInfo'));
const EditSkills = lazy(() => import('~/components/modules/skills/EditSkills'));
const EditLanguage = lazy(() => import('~/components/modules/languages/EditLanguage'));
const EditContacts = lazy(() => import('~/components/modules/contacts/EditContacts'));
const EditExperience = lazy(() => import('~/components/modules/experience/EditExperience'));
const EditEducation = lazy(() => import('~/components/modules/education/EditEducation'));
const EditProjects = lazy(() => import('~/components/modules/projects/EditProjects'));

const CurrentEdit: React.FC = () => {
    const isEdit = useSelector((state: RootState) => selectIsEdit(state));

    switch (isEdit) {
        case RootConstants.Additional:
            return <EditSkills isAdditional/>;
        case RootConstants.Info:
            return <EditInfo/>;
        case RootConstants.Summary:
            return <EditSummary/>;
        case RootConstants.Skills:
            return <EditSkills/>;
        case RootConstants.Certifications:
            return <EditCertificates/>;
        case RootConstants.Languages:
            return <EditLanguage/>;
        case RootConstants.Contacts:
            return <EditContacts/>;
        case RootConstants.Social:
            return <EditContacts isShare/>;
        case RootConstants.Experience:
            return <EditExperience/>;
        case RootConstants.Education:
            return <EditEducation/>;
        case RootConstants.Projects:
            return <EditProjects/>;
        default:
            return '';
    }
};

export default CurrentEdit;