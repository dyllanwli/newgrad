import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { useTranslation } from 'react-i18next';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/landingPage/HeroSection'
import JobList from '../components/JobList';

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log('HomePage component mounted or currentPage changed');

    const fetchJobs = async () => {
      try {
        console.log('Fetching jobs from backend');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/jobs?page=${currentPage}&limit=10`);
        const data = await response.json();
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [currentPage]);

  return (
    <div className="flex flex-col">
      <HeroSection />

      <JobList
        jobs={jobs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        jobsPerPage={10}
      />

      <Footer />
    </div>
  );
}