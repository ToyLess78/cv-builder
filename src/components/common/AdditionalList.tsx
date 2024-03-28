import React from 'react';
import nextId from 'react-id-generator';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { selectAside } from '../../redux/slices/asideSlice';


export const AdditionalList: React.FC = () => {

    const aside = useSelector((state: RootState) => selectAside(state));

    return <ul className='additional'>
        {aside?.additional.data.map(a => {
            return <li key={nextId()}>{a}</li>
        })}
    </ul>
}