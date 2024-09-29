import { Pagination, Spin, Modal } from 'antd';
import { useState, useEffect, ReactNode, Key } from 'react';
import debounce from 'lodash/debounce';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import apiInstance from '../api/api';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";
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

const JobTable: React.FC<TableOneProps> = ({
  heading,
  tableData,
  loading,
  fetchData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any>(tableData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const navigate = useNavigate();

  const TableHeadingCustomer = [
    'Position',
    'Location',
    'Phone Number',
    'Company Name',
    'Work Type',
    'No of Vacancies',
    'Job Category',
    'Employer',
    'Action',
  ];

  const itemsPerPage = tableData?.meta?.itemsPerPage;

  const debouncedSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchData(page);
  };

  const handleDelete = async (rowData: any) => {
    try {
      const response = await apiInstance.delete(`/jobs/${rowData.id}`);
      if (response) {
        fetchData(currentPage);
        toast.success('Job Deleted Successfully', {
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
      title: 'Are you sure you want to delete this Job?',
      icon: <ExclamationCircleFilled />,
      content: `${rowData.position.en}`,
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

  const handleEdit = (rowData: any) => {
    navigate(`/jobs/${rowData.id}`);
  };

  const handleImageClick = (url: string) => {
    setModalImageUrl(url);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const filtered = tableData?.data?.filter((rowData: any) =>
      rowData?.position?.en?.toLowerCase()?.includes(searchTerm.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData]);

  return (
    <>
      <div className="relative shadow-md sm:rounded-lg rounded-xl bg-white dark:bg-boxdark">
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
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Jobs"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex h-[53vh] justify-center py-20 items-center">
              <Spin size="large" />
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-dark">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  {TableHeadingCustomer?.map((item) => (
                    <th
                      scope="col"
                      className="px-6 py-3 sticky top-0 bg-black text-white dark:bg-boxdark-2 dark:text-white z-10"
                      key={item}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              {filteredData && filteredData?.length > 0 ? (
                <tbody>
                  {filteredData?.map((rowData: any, index: Key) => (
                    <tr
                      key={index}
                      className="bg-white cursor-pointer dark:text-white dark:bg-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black-2"
                    >
                      <td className="px-6 py-4">{rowData?.position?.en}</td>
                      <td className="px-6 py-4">{rowData?.location?.en}</td>
                      <td className="px-6 py-4">{rowData?.phoneNumber?.en}</td>
                      <td className="px-6 py-4">{rowData?.companyName?.en}</td>
                      <td className="px-6 py-4">{rowData?.workType?.en}</td>
                      <td className="px-6 py-4">
                        {rowData?.numberOfVacancies}
                      </td>
                      <td className="px-6 py-4">
                        {rowData?.jobCategory?.name?.en}
                      </td>
                      <td className="px-6 py-4">
                        {rowData?.employer?.username}
                      </td>
                      <td className="flex py-5 gap-2">
                        <button onClick={()=>{navigate(`/jobsDetails/${rowData?.id}`)}} className="flex items-center bg-orange-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-xs transition-colors duration-300">
                          <FaEye className="mr-2" /> 
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(rowData)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 mx-2 rounded-md transition duration-300"
                        >
                          <AiOutlineEdit size={16} />
                        </button>
                        <button
                          onClick={() => showDeleteConfirm(rowData)}
                          className="bg-red-500 hover:bg-red-600  text-white font-bold py-1 px-4 mx-2 rounded-md transition duration-300"
                        >
                          <AiOutlineDelete size={16} />
                        </button>
                    
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td
                      colSpan={TableHeadingCustomer.length}
                      className="text-center py-20"
                    >
                      <p className="text-lg dark:text-white text-gray-500">
                        No Jobs found.
                      </p>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          )}
        </div>
        <div className="flex bg-white justify-end dark:text-white dark:bg-boxdark py-5 px-3">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={tableData?.meta?.totalItems || 0}
            pageSize={itemsPerPage}
            className="bg-white px-4 py-2 rounded-lg border dark:bg-boxdark"
          />
        </div>
        <Modal
          open={isModalOpen}
          onCancel={handleModalClose}
          footer={null}
          centered
        >
          <img src={modalImageUrl} alt="Job" className="w-full h-full" />
        </Modal>
      </div>
    </>
  );
};

export default JobTable;
