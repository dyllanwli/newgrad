export interface Discussion {
    id: number;
    title: string;
    created_at?: string;
    updated_at?: string;
    posted_by: string;
    likes: number; 
    comments: number; 
    views: number;
}