import Breadcrumb from '../../components/Breadcrumb';
import { useEffect, useState } from 'react';
import apiInstance from '../../api/api';
import JobTable from '../../components/JobTable';
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';

interface TableRow {
  loading: boolean;
  photo: string;
  order: string;
  meta: any;
}

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<TableRow[]>([]);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const res = await apiInstance.get(`/admin/all-jobs?page=${page}&limit=5`);
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
      <Breadcrumb pageName="Jobs" />
      <div className=" py-2 flex justify-end">
        <Link to="/jobs/JobAction">
          <button
            type="button"
            className=" flex items-center gap-2  rounded-full w-auto bg-black px-6 py-2.5 text-xs font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <IoMdAddCircleOutline size={18} />
            Add Jobs
          </button>
        </Link>
      </div>
      <div className="col-span-12 xl:col-span-8">
        <JobTable
          fetchData={fetchData}
          heading={'List of Jobs'}
          tableData={tableData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Jobs;
