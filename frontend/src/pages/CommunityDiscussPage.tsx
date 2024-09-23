import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DiscussionComponent from '@/components/comments/DiscussionComponent';
import ProgressBar from '@/components/ui/ProgressBar';
import { Discussion } from '@/components/community/types';
import MarkdownViewer from '@/components/ui/markdown/MarkdownViewer';
import { ChevronLeft, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunityDiscussPage: React.FC = () => {
    const { discuss_id } = useParams<{ discuss_id: string }>();
    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDiscussion = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/discussions/${discuss_id}`);
                setDiscussion(response.data);
                setLikes(response.data.likes);
                setViews(response.data.views);
            } catch (error) {
                console.error('Error fetching discussion:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDiscussion();
    }, [discuss_id]);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ProgressBar isLoading={isLoading} />
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={handleBackClick} 
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200, hover:scale-110"
                >
                    <ChevronLeft />
                </button>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <span className="flex items-center">
                            <Heart className="mr-1" /> {likes}
                        </span>
                        <span className="flex items-center">
                            <Eye className="mr-1" /> {views}
                        </span>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl font-bold mb-4 font-mono">{discussion?.title}</h1>
            <hr className="my-4 border-t border-gray-300" />
            <MarkdownViewer content={discussion?.content || ''} />
            <DiscussionComponent discussId={discuss_id || ''} />
        </div>
    );
};

export default CommunityDiscussPage;