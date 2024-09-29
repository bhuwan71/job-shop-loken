import { Spin, Modal } from 'antd';
import { useState, useEffect, Key } from 'react';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { ExclamationCircleFilled } from '@ant-design/icons';
import apiInstance from '../api/api';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomToast extends ToastOptions {
  autoClose?: number;
}

interface TableOneProps {
  heading: string;
  loading: boolean;
  tableData: any;
  fetchData: any;
}
const { confirm } = Modal;

const CategoryTable: React.FC<TableOneProps> = ({
  heading,
  tableData,
  loading,
  fetchData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<any>(tableData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const navigate = useNavigate();

  console.log(filteredData,"filter data");
  

  const debouncedSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleDelete = async (rowData: any) => {
    try {
      const response = await apiInstance.delete(`/job-category/${rowData.id}`);
      if (response) {
        fetchData(currentPage);
        toast.success('Category Deleted Successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        } as CustomToast);
      }
    } catch (error) {
      toast.error('Something went wrong', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      } as CustomToast);
    }
  };

  const showDeleteConfirm = (rowData: any) => {
    confirm({
      title: 'Are you sure delete this Category?',
      icon: <ExclamationCircleFilled />,
      content: `${rowData.title}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(rowData);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleImageClick = (url: string) => {
    setModalImageUrl(url);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (rowData: any) => {
    navigate(`/category/${rowData.id}`);
  };

  useEffect(() => {
    const filtered = tableData?.filter((rowData: { name: any }) =>
      rowData.name.en?.toLowerCase()?.includes(searchTerm.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData]);

  return (
    <>
      <div className="relative sm:rounded-lg rounded-xl bg-white dark:bg-boxdark">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between px-6 py-4 rounded-xl">
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              {heading}
            </h2>
          </div>
          <div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Category"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-10 items-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <table className="w-full shadow-xl text-sm text-left text-gray-500 dark:text-gray-dark">
              <thead className="text-xs bg-black text-white  uppercase  dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Icon</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              {filteredData && filteredData.length > 0 ? (
                <tbody>
                  {filteredData?.map(
                    (rowData: any, index: Key | null | undefined) => (
                      <tr
                        key={index}
                        className={`bg-white cursor-pointer dark:text-white border-b border-[#DFDFDF]`}
                      >
                        <td className="px-6 py-2 whitespace-nowrap">
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={rowData?.icon}
                            alt={rowData?.icon}
                            onClick={() => handleImageClick(rowData?.icon)}
                          />
                        </td>
                        <td className="px-6 py-4">{rowData?.name?.en}</td>
                        <td className="flex py-5 gap-2">
                          <button
                            onClick={() => handleEdit(rowData)}
                            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-1 px-4 mx-2 rounded-md transition duration-300"
                          >
                            <AiOutlineEdit size={16} />
                          </button>
                          <button
                            onClick={() => showDeleteConfirm(rowData)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 mx-8 rounded-md transition duration-300"
                          >
                            <AiOutlineDelete size={16} />
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center py-20">
                      <p className="text-lg dark:text-white text-gray-500">
                        No Category found.
                      </p>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleModalClose}
        centered
      >
        <img
          src={modalImageUrl}
          alt="Category Image"
          className="w-full h-full max-w-xs mx-auto"
        />
      </Modal>
    </>
  );
};

export default CategoryTable;
