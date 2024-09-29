import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import apiInstance from '../../api/api';
import SliderTable from '../../components/SliderTable';
import CategoryTable from '../../components/CategoryTable';

interface TableRow {
  loading: boolean;
  photo: string;
  order: string;
  meta: any;
}

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<TableRow[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await apiInstance.get(`/job-category`);
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
    fetchData();
  }, []);
  return (
    <div>
      <Breadcrumb pageName="Categories" />
      <div className=" py-2 flex justify-end">
        <Link to="/category/CategoryAction">
          <button
            type="button"
            className=" flex items-center gap-2  rounded-full w-auto bg-black px-6 py-2.5 text-xs font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <IoMdAddCircleOutline size={18} />
            Add Category
          </button>
        </Link>
      </div>
      <div className="col-span-12 xl:col-span-8">
        <CategoryTable
          fetchData={fetchData}
          heading={'List of Categories'}
          tableData={tableData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Category;
