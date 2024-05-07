import React from 'react';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { EditorHeader } from './EditorHeader';

interface EditorCustomProps {
    text: string | null;
    setText: React.Dispatch<React.SetStateAction<string | null>>;
}

export const EditorCustom: React.FC<EditorCustomProps> = ({ text, setText }) => {

    return (
        <div className="editor-wrapper">
            <span className="editor-label">description</span>
            <Editor
                value={text as string}
                onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)}
                headerTemplate={<EditorHeader/>}
                style={{ minHeight: '5rem' }}
            />
        </div>
    )
}