import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { ILanguage, selectLanguages, setIsLanguages } from '~/slices/languages.slice';
import { AsideItem } from '~/components/common/Aside/AsideItem';
import styles from './Languages.module.scss';
import { EditButton, HideButton, RemoveButton, ShowAsideButton } from '~/components/common/Buttons/Buttons';
import { setIsEdit } from '~/slices/edit.slice';

interface ILanguagesProps {
    children: ReactNode;
    data?: ILanguage[] | null;
    onRemove?: (id: string) => void;
}

export const Languages: React.FC<ILanguagesProps> = ({children, data = null, onRemove}) => {

    const languages = useSelector((state: RootState) => selectLanguages(state));
    const {isLanguages} = languages;
    const dispatch = useDispatch();
    const handleSetIsLanguages = () => {
        dispatch(setIsLanguages(!isLanguages));
    };

    return (
        <>
            { !isLanguages && !data &&
                <ShowAsideButton
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
                            return <li key={ l.id }><span>{ l.language?.name }</span>
                                <p>{ l.level?.name }</p>
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
                            return l?.language?.name.length &&
                            <li key={ l.id }><span>{ l?.language?.name }</span>
                                <p>{ l?.level?.name }</p>
                                <RemoveButton
                                    onRemove={onRemove ? () => onRemove(l.id) : undefined}
                                />
                            </li>;
                        }) }
                    </ul>
                </AsideItem>
            }
        </>
    );
};