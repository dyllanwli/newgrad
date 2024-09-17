export interface Comment {
    _id: string;
    userId: string;
    username: string;
    content: string;
    created_at: string;
    updated_at: string;
    upvote_count: number;
    downvote_count: number;
    parent_id?: string;
    userVote?: number;
    company_id?: number
  }