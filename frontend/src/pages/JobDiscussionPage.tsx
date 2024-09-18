// JobDiscussionPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard'
import DiscussionComponent from '../components/comments/DiscussionComponent';
import { Job } from '../components/jobs/types';
import JobList from '../components/jobs/JobList';

const JobDiscussionPage: React.FC = () => {
  const { company_id } = useParams<{ company_id: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch all jobs for the company
    fetch(`/api/companies/${company_id}/jobs`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      });
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

export default JobDiscussionPage;
