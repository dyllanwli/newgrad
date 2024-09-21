import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
    content: string;
    editable: boolean;
    handleChange?: (e: any) => void;
}

const MarkdownEditor = ({ content, editable, handleChange }: MarkdownEditorProps) => {
    const [value, setValue] = useState(content);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setValue(val);
        handleChange && handleChange({
            target: { name: 'description', value: val }
        });
    };

    return (
        <div>
            {editable ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    className="border p-2 w-full h-full bg-white text-black"
                />
            ) : (
                <ReactMarkdown>{value}</ReactMarkdown>
            )}
        </div>
    );
}

export default MarkdownEditor;