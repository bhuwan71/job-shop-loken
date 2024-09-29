import Breadcrumb from '../../components/Breadcrumb';
import JobSeekerTable from '../../components/JobSeekerTable';
import { useEffect, useState } from 'react';
import apiInstance from '../../api/api';

const JobSeekers = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<any>([]);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const res = await apiInstance.get(
        `admin/job-seeker?page=${page}&limit=8`,
      );
      if (res) {
        setTableData(res?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);
  return (
    <div>
      <Breadcrumb pageName="Job Seeker" />
      <div className="col-span-12 xl:col-span-8">
        <JobSeekerTable
          fetchData={fetchData}
          heading={'List of Job Seeker'}
          tableData={tableData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default JobSeekers;
