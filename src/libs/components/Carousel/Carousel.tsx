import React, { useState, ReactNode, CSSProperties } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import './Carousel.scss';

const MAX_VISIBILITY = 3;

interface CardProps {
    title: string;
    content: string;
}

export const Card: React.FC<CardProps> = ({ title, content }) => (
    <div className='card'>
        <h2>{title}</h2>
        <p>{content}</p>
    </div>
);

interface CarouselProps {
    children: ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const [active, setActive] = useState<number>(2);
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
        <div className='carousel'>
            {active > 0 && (
                <button className='nav left' onClick={() => setActive((i) => i - 1)}>
                    <TiChevronLeftOutline />
                </button>
            )}
            {React.Children.map(children, (child, i) => (
                <div
                    className='card-container'
                    style={getCardContainerStyles(i) as CSSProperties}
                >
                    {child}
                </div>
            ))}
            {active < count - 1 && (
                <button className='nav right' onClick={() => setActive((i) => i + 1)}>
                    <TiChevronRightOutline />
                </button>
            )}
        </div>
    );
};


