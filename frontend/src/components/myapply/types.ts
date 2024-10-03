import { Job } from '../jobs/types';

export interface Profile {
    _id: string;
    username: string;
    email: string;
    user_id: string;
    bio?: string;
    job_applications?: UserJobApplication[];
    liked_discussions?: string[];
    admin?: boolean;
}

export interface UserJobApplication {
    job_id: string;
    job: Job;
    status: string;
    applied_at?: string;
    created_at?: string;
    updated_at: string;
}