import { Pagination, Spin, Tag } from 'antd';
import { useState, useEffect, ReactNode } from 'react';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Switch } from 'antd';
import apiInstance from '../api/api';

interface TableRow {
  [x: string]: ReactNode;
  id: any;
  loading: boolean;
  photo: string;
  name: string;
  email: string;
  phone: string;
  username: string;
}

interface TableOneProps {
  heading: string;
  loading: boolean;
  tableData: any;
  fetchData: any;
}
const JobSeekerTable: React.FC<TableOneProps> = ({
  heading,
  tableData,
  loading,
  fetchData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<TableRow[]>(tableData?.data);
  const [searchTerm, setSearchTerm] = useState('');
  const TableHeadingCustomer = [
    'Full Name',
    'User Name',
    'Phone Number',
    'Address',
    'Email',
    'Block / Unblock',
  ];
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

  useEffect(() => {
    const filtered = tableData?.data?.filter(
      (rowData: { fullName: any; name: string; email: string }) =>
        rowData.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rowData.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData]);

  const onChange = async (checked: boolean) => {
    try {
      await apiInstance.delete(`/admin/block-user/${checked}`);
      toast.success('User Status Changed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (err) {
      toast.error(`User Status Changed ${err}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  return (
    <>
      <div className="relative  shadow-md sm:rounded-lg rounded-xl">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between px-6 py-4 rounded-xl bg-white dark:bg-boxdark">
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
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Employers"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto ">
          {loading ? (
            <div className="flex h-[60vh] justify-center py-20 items-center">
              <Spin size="large" />
            </div>
          ) : (
            <table className="w-full h-[60vh] text-sm text-left text-gray-500 dark:text-graydark">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  {TableHeadingCustomer &&
                    TableHeadingCustomer.map((item) => (
                      <th
                        scope="col"
                        className="px-6 py-3 sticky top-0 bg-black text-white dark:bg-boxdark-2 dark:text-whiten z-10"
                        key={item}
                      >
                        {item}
                      </th>
                    ))}
                </tr>
              </thead>
              {filteredData && filteredData.length > 0 ? (
                <>
                  <tbody>
                    {filteredData?.map((rowData, index) => (
                      <>
                        <tr
                          key={index}
                          className="bg-white  cursor-pointer dark:text-white dark:bg-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black-2"
                        >
                          <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="pl-3">
                              <div className="text-base font-semibold">
                                {rowData?.fullName}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-8">{rowData?.username}</td>
                          <td className="py-4 px-8">{rowData.phoneNumber}</td>
                          <td className="py-4 px-8">{rowData?.address}</td>
                          <td className="py-4 px-8">{rowData?.email}</td>
                          <td className="py-4 px-8  flex gap-1">
                            <Switch
                              style={{ background: '#1AB0E5' }}
                              defaultValue={rowData?.isBlocked as boolean}
                              onChange={() => {
                                onChange(rowData?.id);
                              }}
                            />

                            {!rowData?.isBlocked ? (
                              <>
                                <Tag color="green">Active</Tag>
                              </>
                            ) : (
                              <>
                                <Tag color="red">Blocked</Tag>
                              </>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <tbody>
                    <tr>
                      <td
                        colSpan={TableHeadingCustomer?.length}
                        className="text-center py-20 "
                      >
                        <p className="text-lg dark:text-white text-gray-500">
                          No User found.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
            </table>
          )}
        </div>

        <div className="flex bg-white justify-end dark:text-white dark:bg-box dark  py-5 px-3">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={tableData?.meta?.totalItems}
            defaultPageSize={5}
          />
        </div>
      </div>
    </>
  );
};

export default JobSeekerTable;
