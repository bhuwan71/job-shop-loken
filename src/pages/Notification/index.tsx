import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { useEffect, useState } from 'react';
import apiInstance from '../../api/api';
import { FaPushed } from 'react-icons/fa6';
import PushNotificationTable from '../../components/PushNotificationTable';
interface TableRow {
  loading: boolean;
  photo: string;
  order: string;
  meta: any;
}

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<TableRow[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await apiInstance.get(`/notification`);
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
      <Breadcrumb pageName="Notifications" />
      <div className=" py-2 flex justify-end">
        <Link to="/notification/NotificationAction">
          <button
            type="button"
            className=" flex items-center gap-2  rounded-full w-auto bg-black px-6 py-2.5 text-xs font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <FaPushed size={18} />
            Push Notification
          </button>
        </Link>
      </div>
      <div className="col-span-12 xl:col-span-8">
        <PushNotificationTable
          fetchData={fetchData}
          heading={'List of Notification'}
          tableData={tableData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Notification;
