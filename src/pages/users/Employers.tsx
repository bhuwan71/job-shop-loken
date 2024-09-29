import Breadcrumb from '../../components/Breadcrumb';
import { useEffect, useState } from 'react';
import apiInstance from '../../api/api';
import EmployerTable from '../../components/EmployerTable';

interface TableRow {
  loading: boolean;
  photo: string;
  name: string;
  email: string;
  phone: string;
  username: string;
}

const Employers = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const res = await apiInstance.get(`admin/employer?page=${page}&limit=8`);
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
      <Breadcrumb pageName="Employers" />
      <div className="col-span-12 xl:col-span-8">
        <EmployerTable
          heading={'List of Employers'}
          fetchData={fetchData}
          tableData={tableData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Employers;
