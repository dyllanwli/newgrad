export interface Job {
    _id: string;
    position: string;
    company: string;
    company_id: string;
    locations: { state: string; city: string }[];
    not_sponsor?: boolean;
    us_citizen?: boolean;
    views: number;
    date_posted: string;
    expired: boolean;
    apply_link: string;
    min_salary?: number;
    max_salary?: number;
}