// CompanyDiscussionPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DiscussionComponent from '@/components/comments/DiscussionComponent';
import { Job } from '@/components/jobs/types';
import JobList from '@/components/jobs/JobList';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

const CompanyDiscussionPage: React.FC = () => {
  const { company_id } = useParams<{ company_id: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/companies/${company_id}/jobs`);
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [company_id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <JobList
        jobs={jobs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      <div className="mt-8">
        <DiscussionComponent discussId={company_id || ''} />
      </div>
    </div>
  );
};

export default CompanyDiscussionPage;
