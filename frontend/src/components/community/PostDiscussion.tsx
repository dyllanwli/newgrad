import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MarkdownEditor from '@/components/ui/markdown/MarkdownEditor';
import axios from 'axios';

// Define the shape of a tag
interface Tag {
    name: string;
    color: string;
}

const colors = ['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c'];

const PostDiscussion: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [tagInput, setTagInput] = useState('');

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setTagInput(input);

        // Check if the last character is a space
        if (input.endsWith(' ')) {
            const newTagName = input.trim();
            if (newTagName && !tags.some(tag => tag.name.toLowerCase() === newTagName.toLowerCase())) {
                const newTag: Tag = {
                    name: newTagName,
                    color: colors[tags.length % colors.length], 
                };
                setTags([...tags, newTag]);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log('Title:', title);
        console.log('Content:', content);
        console.log('Tags:', tags.map(tag => tag.name));
    };

    return (
        <motion.div 
            className="container mx-auto p-4 md:w-1/2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold mb-4">Post a New Discussion</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <MarkdownEditor
                        id="content"
                        value={content}
                        onChange={(value) => setContent(value)}
                        height={200}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                        Tags
                    </label>
                    <input
                        id="tags"
                        type="text"
                        value={tagInput}
                        onChange={handleTagChange}
                        placeholder="Enter tags separated by space"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className="mt-2 flex flex-wrap">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="mr-2 mb-2 px-2 py-1 rounded flex items-center"
                                style={{ backgroundColor: tag.color, color: '#fff' }}
                            >
                                <span
                                    onClick={() => handleRemoveTag(index)}
                                    className="text-sm font-bold cursor-pointer"
                                >
                                    {tag.name} x
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
                <motion.button
                    type="submit"
                    className="py-2 px-4 rounded bg-purple-500 hover:bg-purple-600 text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Post
                </motion.button>
            </form>
        </motion.div>
    );
};

export default PostDiscussion;
