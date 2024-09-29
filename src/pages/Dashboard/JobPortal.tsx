import { useEffect, useState } from 'react';
import apiInstance from '../../api/api.ts';
import { MdWork } from 'react-icons/md';
import { GrUserWorker } from 'react-icons/gr';
import { BiHomeSmile } from 'react-icons/bi';
import { CiUser } from 'react-icons/ci';
import AppliedJobs from '../../components/AppliedJob.tsx';
import JobApplicationsChart from './JobApplicationChart.tsx';
import JobApplicationsBarChart from './JobApplicationBarChart.tsx';

const JobPortal = () => {
  const [status, setStatus] = useState<any>({});
  const [numOfApplications, setNumOfApplications] = useState<any>([]);
  const [barChartData, setBarChartData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStats = async () => {
    try {
      const [statsRes, jobsRes, applicationsRes] = await Promise.allSettled([
        apiInstance?.get('/stats'),
        apiInstance?.get('/stats/number-of-application'),
        apiInstance?.get('/stats/line-chart-posted-according-to-day'),
      ]);

      if (statsRes?.status === 'fulfilled') {
        setStatus(statsRes?.value?.data);
      }

      if (jobsRes?.status === 'fulfilled') {
        setBarChartData(jobsRes?.value?.data);
      }

      if (applicationsRes?.status === 'fulfilled') {
        setNumOfApplications(applicationsRes?.value?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Dashboard Cards */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
          <MdWork size={32} />
          <div className="text-right">
            <div className="text-4xl font-bold">{status?.allJobs}</div>
            <div className="text-sm font-medium">Total Jobs</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
          <GrUserWorker size={32} />
          <div className="text-right">
            <div className="text-4xl font-bold">{status?.jobSeeker}</div>
            <div className="text-sm font-medium">Job Seeker</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
          <BiHomeSmile size={32} />
          <div className="text-right">
            <div className="text-4xl font-bold">{status?.employer}</div>
            <div className="text-sm font-medium">Employer</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
          <CiUser size={32} />
          <div className="text-right">
            <div className="text-4xl font-bold">{status?.allUser}</div>
            <div className="text-sm font-medium">Total Users</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <div className="text-right">
            <div className="text-4xl font-bold">{status?.activeJob}</div>
            <div className="text-sm font-medium">Active Job</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex lg:flex-row flex-col gap-6 mt-12">
        <div className="lg:w-[50%] bg-white shadow-lg p-6 rounded-lg">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
            </div>
          ) : (
            numOfApplications?.length > 0 && <JobApplicationsChart data={numOfApplications} />
          )}
        </div>
        <div className="lg:w-[50%] bg-white shadow-lg p-6 rounded-lg">
          {loading ? (
            <div className="flex h-[400px] items-center justify-center">
              <div className="border-t-4 border-green-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
            </div>
          ) : (
            <JobApplicationsBarChart data={barChartData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPortal;
