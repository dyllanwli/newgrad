import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DiscussionComponent from '@/components/comments/DiscussionComponent';
import ProgressBar from '@/components/ui/ProgressBar';
import { Discussion } from '@/components/community/types';
import MarkdownViewer from '@/components/ui/markdown/MarkdownViewer';
import { ChevronLeft, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from "@clerk/clerk-react"
import { API_BASE_URL } from '@/config';
const CommunityDiscussPage: React.FC = () => {
    const { discuss_id } = useParams<{ discuss_id: string }>();
    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const { isSignedIn, getToken } = useAuth(); 
    const { user } = useUser();
    useEffect(() => {
        const fetchDiscussion = async () => {
            setIsLoading(true);
            try {
                const user_id = user?.id;
                const response = await axios.get(`${API_BASE_URL}/api/discussions/${discuss_id}`, {
                    params: {
                        user_id: user_id
                    }
                });
                setDiscussion(response.data);
                setLikes(response.data.likes);
                setViews(response.data.views);
                setLiked(response.data.liked);
            } catch (error) {
                console.error('Error fetching discussion:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDiscussion();
    }, [discuss_id]);

    const handleBackClick = () => {
        const previousPage = document.referrer; 
        if (previousPage.includes('/post-discussion')) {
            navigate('/community');
        } else {
            navigate(-1); 
        }
    };

    const handleLikeClick = async () => {
        if (!isSignedIn) {
            // Handle not signed in case
            return;
        }
        const token = await getToken();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/discussions/${discuss_id}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLiked(response.data.liked);
            setLikes((prevLikes) => prevLikes + (response.data.liked ? 1 : -1));
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ProgressBar isLoading={isLoading} />
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={handleBackClick} 
                    className="p-2 text-purple-600 hover:text-gray-800 transition-colors duration-200 hover:scale-110"
                >
                    <ChevronLeft />
                </button>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <span className="flex items-center">
                            <Heart 
                                className={`mr-1 cursor-pointer ${liked ? 'text-red-500' : ''}`} 
                                onClick={handleLikeClick} 
                                fill={liked ? 'red' : 'none'} // Add this line to fill the heart when liked
                            /> 
                            {likes}
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