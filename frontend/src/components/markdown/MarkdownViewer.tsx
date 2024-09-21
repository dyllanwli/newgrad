import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
    content: string;
    className?: string;
}

const MarkdownViewer = ({ content, className }: MarkdownEditorProps) => {

    return (
        <ReactMarkdown className={`prose ${className}`}>{content}</ReactMarkdown>
    );
}

export default MarkdownViewer;