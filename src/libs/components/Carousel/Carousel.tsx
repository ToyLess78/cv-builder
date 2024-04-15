import React, { CSSProperties, ReactNode, useState } from 'react';
import styles from './Carousel.module.scss';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { loadFromLocalStorage, saveToLocalStorage } from '~/utils/local-storage.utills';

const MAX_VISIBILITY = 3;

interface CardProps {
    title: string;
    src?: string;
    onClick: () => void
}
const  templatesArr = [
    './templates/1.png',
    './templates/2.png',
    './templates/3.png',
    './templates/4.png',
    './templates/5.png',
    './templates/6.png',
    './templates/7.png',
    './templates/8.png',
    './templates/9.png',
    './templates/10.png',
    './templates/11.png',
    './templates/12.png',
    './templates/13.png',
]
const Card: React.FC<CardProps> = ({ title, src, onClick }) => (
    <div className={styles.card} onClick={onClick}>
        {src && <img src={src} alt='template'/>}
        <h5>{title}</h5>

    </div>
);

interface CarouselProps {
    children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const [active, setActive] = useState<number>(loadFromLocalStorage('active') !== undefined ? loadFromLocalStorage('active') : 2);
    const count = React.Children.count(children);

    const getCardContainerStyles = (i: number): {
        '--direction': number;
        '--abs-offset': number;
        '--offset': number;
        pointerEvents: string;
        display: string;
        '--active': number;
        opacity: string
    } => ({
        '--active': i === active ? 1 : 0,
        '--offset': (active - i) / 3,
        '--direction': Math.sign(active - i),
        '--abs-offset': Math.abs(active - i) / 3,
        pointerEvents: active === i ? 'auto' : 'none',
        opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
        display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
    });

    return (
        <div className={ styles.carousel }>
            {active > 0 && (
                <button className={`${styles.nav} ${styles.left}`} onClick={() => setActive((i) => i - 1)}>
                    <IoIosArrowDropleft />
                </button>
            )}

            {React.Children.map(children, (child, i) => (
                <div
                    className={styles.container}
                    style={getCardContainerStyles(i) as CSSProperties}
                >
                    {child}
                </div>
            ))}
            {active < count - 1 && (
                <button className={`${styles.nav} ${styles.right}`} onClick={() => setActive((i) => i + 1)}>
                    <IoIosArrowDropright />
                </button>
            )}
        </div>
    );
};

interface MenuProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Menu: React.FC<MenuProps> = ({isOpen, setIsOpen}) => {
    return (
                    <Carousel>
                        {templatesArr.map((src, i) => (
                            <Card
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    saveToLocalStorage('active', i )
                                }}
                                key={i}
                                title={'Card ' + (i + 1)}
                                src={src}
                            />
                        ))}
                    </Carousel>
    )
}
export default Menu;

