import React, { ReactNode } from 'react';

interface ILanguagesProps {
    children: ReactNode;
}
export const Languages: React.FC<ILanguagesProps> = ({ children }) => {
    return (
        <div>
            <h2>Parent Component</h2>
            <div>{children}</div>
        </div>
    );
};