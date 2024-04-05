import React from 'react';
import styles from './Test.module.css';

interface ITitleProps {
    text: string;
    color?: string;
}

export const Test: React.FC<ITitleProps> = ({ text, color = '#1976D2' }) => {
    const titleStyle = {
        color: color
    };

    // const titleAfterStyle = {
    //     borderLeft: `2px solid ${color}`
    // };

    return (
        <h4 className={styles.title} style={titleStyle}>
            {text}
            <style>
                {`
                    .${styles.title}:after {
                        border-left: 2px solid ${color};
                    }
                `}
            </style>
        </h4>
    );
};
