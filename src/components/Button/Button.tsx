import React, { ReactNode, useRef } from 'react';
import { CssColor } from '../../types/types.ts';


interface ButtonProps {
    hoverColor: CssColor
    children: ReactNode
}

const Button: React.FC<ButtonProps> = ({ hoverColor, children }) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleMouseEnter = () => {
        if (buttonRef.current) {
            buttonRef.current.style.backgroundColor = hoverColor;
        }
    };

    const handleMouseLeave = () => {
        if (buttonRef.current) {
            buttonRef.current.style.backgroundColor = 'grey';
        }
    };

    const buttonStyle = {
        backgroundColor: 'grey',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer'
    };

    return (
        <button
            ref={buttonRef}
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    );
};

export default Button;
