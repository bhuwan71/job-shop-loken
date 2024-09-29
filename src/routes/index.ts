import { lazy } from 'react';

const Employers = lazy(() => import('../pages/users/Employers'));
const JobSeeker = lazy(() => import('../pages/users/JobSeekers'));

const AdminProfile = lazy(() => import('../pages/profile/AdminProfile'));
const UserProfile = lazy(() => import('../pages/profile/UserProfile'));
const JobPortal = lazy(() => import('../pages/Dashboard/JobPortal'));

const Slider = lazy(() => import('../pages/Slider/index'));
const SliderAction = lazy(() => import('../pages/Slider/Action'));
const SliderEdit = lazy(() => import('../pages/Slider/Action'));

const Category = lazy(() => import('../pages/category/index'));
const CategoryAction = lazy(() => import('../pages/category/Action'));
const CategoryEdit = lazy(() => import('../pages/category/Action'));


const Jobs = lazy(() => import('../pages/Jobs'));
const JobsAction = lazy(() => import('../pages/Jobs/Action'));
const JobsEdit = lazy(() => import('../pages/Jobs/Action'));
const JobDetails = lazy(() => import('../pages/Jobs/Details'));



const Notification = lazy(() => import('../pages/Notification/index'));
const NotificationAction = lazy(() => import('../pages/Notification/Action'));
const Policy = lazy(() => import('../pages/Policy'));



const coreRoutes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: JobPortal,
  },
  {
    path: '/jobs',
    title: 'Jobs',
    component: Jobs,
  },
  {
    path: '/jobs/JobAction',
    title: 'Job Action',
    component: JobsAction,
  },
  {
    path: '/jobs/:id',
    title: 'Job Action',
    component: JobsEdit,
  },
  {
    path: '/jobsDetails/:id',
    title: 'Job Details',
    component: JobDetails,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: AdminProfile,
  },
  {
    path: '/userProfile/:id',
    title: 'userProfile',
    component: UserProfile,
  },
  {
    path: '/users/job-seekers',
    title: 'Job Seekers',
    component: JobSeeker,
  },
  {
    path: '/users/employers',
    title: 'Employer',
    component: Employers,
  },
  {
    path: '/slider',
    title: 'Slider',
    component: Slider,
  },
  {
    path: '/slider/SliderAction',
    title: 'Slider Action',
    component: SliderAction,
  },
  {
    path: '/slider/:id',
    title: 'Slider Action',
    component: SliderEdit,
  },
  {
    path: '/category',
    title: 'Category',
    component: Category,
  },
  {
    path: '/category/CategoryAction',
    title: 'Category Action',
    component: CategoryAction,
  },
  {
    path: '/category/:id',
    title: 'Category Action',
    component: CategoryEdit,
  },
  {
    path: '/notification',
    title: 'Notification',
    component: Notification,
  },
  {
    path: '/notification/NotificationAction',
    title: 'Notification',
    component: NotificationAction,
  },
];
const differentRoute  =[
  {
    path: '/policy',
    title: 'Policy',
    component: Policy,
  },
]

const routes = [...coreRoutes,...differentRoute];
export default routes;
