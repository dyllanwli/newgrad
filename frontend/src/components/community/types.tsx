export interface Discussion {
    _id: number;
    title: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
    posted_by?: string;
    username?: string;
    likes: number; 
    comments: number; 
    views: number;
}