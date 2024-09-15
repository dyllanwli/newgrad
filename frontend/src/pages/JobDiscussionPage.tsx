// JobDiscussionPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard'
import DiscussionComponent from '../components/DiscussionComponent';
import { Job } from '../components/jobs/types';

const JobDiscussionPage: React.FC = () => {
  const { company_id } = useParams<{ company_id: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companyName, setCompanyName] = useState<string>('');

  useEffect(() => {
    // Fetch all jobs for the company
    fetch(`/api/companies/${company_id}/jobs`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jobs);
        setCompanyName(data.companyName);
      });
  }, [company_id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{companyName} Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
      <div className="mt-8">
        <DiscussionComponent companyId={company_id || ''} />
      </div>
    </div>
  );
};

export default JobDiscussionPage;
