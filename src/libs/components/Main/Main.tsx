import React from 'react';
import styles from './Main.module.css'
// import { MonthYearPickerSingle, MonthYearPickerWithRange } from '~/components';
import { Card, Carousel } from '~/components/Carousel/Carousel';

interface IMainProps {
    isOrder: boolean
}
const CARDS = 10;
export const Main: React.FC<IMainProps> = ({ isOrder }) => {

    return (
        <section className={styles.main} style={isOrder ? { order: 2 } : {}}>
            {/*<MonthYearPickerWithRange/>*/}
            {/*<MonthYearPickerSingle />*/}
            <Carousel>
                {[...new Array(CARDS)].map((_, i) => (
                    <Card
                        key={i}
                        title={'Card ' + (i + 1)}
                        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    />
                ))}
            </Carousel>

        </section>

    )
}