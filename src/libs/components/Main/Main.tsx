import React from 'react';
import styles from './Main.module.css';
import {
    BreezeTitle,
    Certificates,
    EditeWrapper,
    MonthYearPickerSingle,
    MonthYearPickerWithRange,
    UnderlineInput
} from '~/components';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectCertificates } from '~/slices/certificatesSlice';


interface IMainProps {
    isOrder: boolean
}

export const Main: React.FC<IMainProps> = ({ isOrder }) => {
    const certificates = useSelector((state: RootState) => selectCertificates(state));

    return (
        <section className={styles.main} style={isOrder ? { order: 2 } : {}}>
            <MonthYearPickerWithRange/>
            <MonthYearPickerSingle />
            <EditeWrapper
                preview={
                    < Certificates data={certificates}>
                        <BreezeTitle text={certificates.title} />
                    </Certificates>
                }
                edite={
                <>
                    <UnderlineInput
                        label="title"
                        onChange={(e) => console.log(e.currentTarget.value)}
                    />
                    <UnderlineInput
                        label="issue"
                        onChange={(e) => console.log(e.currentTarget.value)}
                    />
                    <UnderlineInput
                        label="link"
                        onChange={(e) => console.log(e.currentTarget.value)}
                    />
                </>
                }
            />

        </section>

    )
}