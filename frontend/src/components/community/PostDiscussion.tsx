import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MarkdownEditor from '@/components/ui/markdown/MarkdownEditor';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

// Define the shape of a tag
interface Tag {
    name: string;
    color: string;
}

const colors = ['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c'];

const PostDiscussion: React.FC = () => {
    const navigate = useNavigate();
    const { getToken, isSignedIn } = useAuth();
    const { user } = useUser();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!isSignedIn) {
                throw new Error('User is not signed in');
            }
            const token = await getToken();
            const response = await axios.post(`${API_BASE_URL}/api/discussions`, {
                title,
                content,
                tags: tags.map(tag => tag.name),
                posted_by: user?.id,
                username: user?.username
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Discussion created:', response.data);
            navigate(`/discuss/${response.data._id}`);
        } catch (error) {
            console.error('Error creating discussion:', error);
        }
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
                <div className="flex justify-between">
                    <motion.button
                        type="submit"
                        className="py-2 px-4 rounded bg-purple-500 hover:bg-purple-600 text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Post
                    </motion.button>
                    <motion.button
                        onClick={() => navigate(-1)}
                        className="py-2 px-4 rounded bg-gray-500 hover:bg-gray-600 text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Back
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default PostDiscussion;
