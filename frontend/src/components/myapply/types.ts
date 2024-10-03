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

export interface Job {
    _id: string;
    jobTitle: string;
    companyName: string;
    status: string;
    appliedDate: string;
}

export interface UserJobApplication {
    job_id: string;
    status: string;
    applied_at: Date;
}