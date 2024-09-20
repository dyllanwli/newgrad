// src/components/jobs/types.tsx

export interface Company {
    _id: string;
    name: string;
    views: number;
    description?: string;
    employees?: number;
}

export interface Job {
    _id: string;
    position: string;
    company?: Company;
    company_id: string;
    company_name: string;
    locations: { state?: string; city?: string; country?: string }[];
    not_sponsor?: boolean;
    us_citizen?: boolean;
    created_at?: string;
    internship?: boolean;
    remote?: boolean;
    expired: boolean;
    apply_link: string;
    min_salary?: number;
    max_salary?: number;
    tags?: string[]
    description?: string;
}