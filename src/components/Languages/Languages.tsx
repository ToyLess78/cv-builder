import React from 'react';
import nextId from 'react-id-generator';

interface LanguagesProps {
    languages: string[][]
}
export const Languages: React.FC<LanguagesProps> = ({languages}) => {
    return(
        <>
        {languages.map(l => {
                return <li key={nextId()}><span>{l[0]}</span><p>{l[1]}</p></li>
            })}
        </>
    )
}