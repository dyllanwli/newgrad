import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/root-layout'
import './i18n';

import LandingPage from './pages/LandingPage.tsx';
import ErrorPage from './pages/commonPages/ErrorPage.tsx';
import PravicyPolicyPage from './pages/commonPages/PravicyPolicyPage.tsx';
import TermsOfServicePage from './pages/commonPages/TermsOfServicePage.tsx';
import CookiePolicyPage from './pages/commonPages/CookiePolicyPage.tsx'
import AboutUsPage from './pages/commonPages/AboutUsPage.tsx'
import SafetyTipsPage from './pages/commonPages/SafetyTipsPage.tsx'
import FindPage from './pages/FindPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import HomePage from './pages/HomePage.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />, // Add errorElement
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/privacy-policy", element: <PravicyPolicyPage /> },
      { path: "/terms-of-service", element: <TermsOfServicePage /> },
      { path: "/cookie-policy", element: <CookiePolicyPage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/safety-tips", element: <SafetyTipsPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/find", element: <FindPage /> },
      { path: "/profile", element: <ProfilePage /> },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)