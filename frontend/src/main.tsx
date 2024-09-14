import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/root-layout'
import './i18n';

import LandingPage from './pages/HomePage.tsx';
import ErrorPage from './pages/commonPages/ErrorPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import SearchPage from './pages/SearchPage.tsx';
// import DiscussPage from './pages/DiscussPage.tsx'
// import PostJobsPage from './pages/PostJobsPage.tsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />, // Add errorElement
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/search", element: <SearchPage /> },
      // { path: "/discuss", element: <DiscussPage /> },
      // { path: "/postjobs", element: <PostJobsPage /> },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)