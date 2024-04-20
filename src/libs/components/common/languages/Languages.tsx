import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { ILanguage, selectLanguages, setIsLanguages } from '~/slices/languagesSlice';
import { AsideItem } from '../../Aside/AsideItem';
import styles from './Languages.module.scss';
import { EditButton, HideButton, RemoveButton, ShowButton } from '~/components/common/Buttons/Buttons';
import { setIsEdit } from '~/slices/editSlice';

interface ILanguagesProps {
    children: ReactNode;
    data?: ILanguage[] | null;
}

export const Languages: React.FC<ILanguagesProps> = ({children, data = null}) => {

    const languages = useSelector((state: RootState) => selectLanguages(state));
    const {isLanguages} = languages;
    const dispatch = useDispatch();
    const handleSetIsLanguages = () => {
        dispatch(setIsLanguages(!isLanguages));
    };

    return (
        <>
            { !isLanguages && !data &&
                <ShowButton
                    onClick={ handleSetIsLanguages }
                    title="Languages"
                />
            }
            {!data && languages && isLanguages &&
                <AsideItem>
                    { isLanguages &&
                        <>
                            <EditButton
                                title="languages"
                                onClick={ () => dispatch(setIsEdit('languages')) }
                            />
                            <HideButton
                                onClick={ handleSetIsLanguages }
                                title="languages"

                            />
                        </>}
                    {children}
                    <ul className={ styles.languages }>
                        {languages.data?.map(l => {
                            return <li key={ l.id }><span>{ l.language.name }</span>
                                <p>{ l.level.name }</p>
                            </li>;
                        }) }
                    </ul>
                </AsideItem>
            }
            {data && isLanguages &&
                <AsideItem>
                    {children}
                    <ul className={ styles.languages }>
                        {data?.map(l => {
                            return <li key={ l.id }><span>{ l.language.name }</span>
                                <p>{ l.level.name }</p><RemoveButton/>
                            </li>;
                        }) }
                    </ul>
                </AsideItem>
            }
        </>
    );
};