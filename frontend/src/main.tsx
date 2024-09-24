import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './root-layout.tsx'
import './i18n';

import LandingPage from './pages/HomePage.tsx';
import ErrorPage from './pages/commonPages/ErrorPage.tsx';
import MyApplyPage from './pages/MyApplyPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import CompanyDiscussionPage from './pages/CompanyDiscussionPage.tsx';
import PostJobPage from './pages/PostJobPage';
import CommunityPage from './pages/CommunityPage.tsx'
import CommunityDiscussPage from './pages/CommunityDiscussPage.tsx'
import PostDiscussion from './components/community/PostDiscussion.tsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/myapply", element: <MyApplyPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/company/:company_id", element: <CompanyDiscussionPage /> },
      { path: "/discuss/:discuss_id", element: <CommunityDiscussPage /> },
      { path: "/postjob", element: <PostJobPage /> },
      { path: "/community", element: <CommunityPage /> },
      { path: "/post-discussion", element: <PostDiscussion /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)