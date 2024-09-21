import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/root-layout'
import './i18n';

import LandingPage from './pages/HomePage.tsx';
import ErrorPage from './pages/commonPages/ErrorPage.tsx';
import MyApplyPage from './pages/MyApplyPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import JobDiscussionPage from './pages/JobDiscussionPage';
import PostJobPage from './pages/PostJobPage';
// import DiscussPage from './pages/DiscussPage.tsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />, // Add errorElement
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/myapply", element: <MyApplyPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/jobs/:company_id", element: <JobDiscussionPage /> },
      { path: "/postjob", element: <PostJobPage /> }
      // { path: "/discuss", element: <DiscussPage /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)