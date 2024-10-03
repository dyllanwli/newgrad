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
    id: string;
    job_title: string;
    company_name: string;
    status: string;
    applied_at: string;
    job?: Job;
}