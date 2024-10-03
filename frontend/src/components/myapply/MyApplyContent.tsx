import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserJobApplication } from './types';

interface MyApplyContentProps {
    applications: UserJobApplication[];
  }

const MyApplyContent: React.FC<MyApplyContentProps> = ({ applications }) => {

  return (
    <div className="container mx-auto px-4 py-8">
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="space-y-2">
          {applications.map((app) => (
            <li key={app._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{app.jobTitle}</h3>
              <p>{app.companyName}</p>
              <p>Status: {app.status}</p>
              <p>Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplyContent;