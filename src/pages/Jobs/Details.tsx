import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import apiInstance from '../../api/api';
import { useReactToPrint } from 'react-to-print';
import { Modal, Button, Spin, Typography, List } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { MdEmail } from 'react-icons/md';

const { Title, Text } = Typography;

const Details = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCV, setSelectedCV] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const fetchJobDetails = async () => {
    try {
      const res = await apiInstance.get(`/admin/jobs/${id}`);
      if (res) {
        setJobDetails(res.data);
      } else {
        console.log('Error fetching job details');
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `CV_${selectedCV?.name?.en}`,
  });

  const openModal = (cv: any) => {
    setSelectedCV(cv);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCV(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="text-center border-b pb-6 mb-6">
          <img
            src={jobDetails?.jobCategory?.icon}
            alt={jobDetails?.position?.en}
            className="mx-auto w-28 h-28 rounded-full mb-4 shadow-md"
          />
          <Title level={1} className="text-gray-800 mb-2">
            {jobDetails?.position?.en}
          </Title>
          <Text className="text-2xl text-gray-600">
            {jobDetails?.companyName?.en}
          </Text>
        </div>

        {/* Applied Jobs Table */}
        <div className="mt-8">
          <Title level={2} className="text-gray-800 mb-4">
            Applied Jobs
          </Title>
          {jobDetails?.applyJob && jobDetails?.applyJob.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-3 border-r">Job Seeker</th>
                    <th className="px-6 py-3 border-r">Status</th>
                    <th className="px-6 py-2">View CV</th>
                  </tr>
                </thead>
                <tbody>
                  {jobDetails?.applyJob.map((application: any) => (
                    <tr
                      key={application.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 border-r">
                        {application.jobSeekerId?.username}
                      </td>
                      <td className="px-6 py-4 border-r">{application.status}</td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          onClick={() => openModal(application.jobSeekerId)}
                          type="primary"
                          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm px-4 py-1 rounded-lg shadow-md hover:opacity-80 transition"
                        >
                          View CV
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Text className="text-center text-gray-500">
              No jobs applied yet.
            </Text>
          )}
        </div>

        {/* Modal for CV */}
        <Modal
          visible={isModalOpen}
          title="CV Details"
          onCancel={closeModal}
          footer={[
            <Button
              key="download"
              className="bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => {
                handlePrint();
                closeModal();
              }}
              icon={<DownloadOutlined />}
            >
              Download CV
            </Button>,
          ]}
          width={800}
        >
          <div ref={componentRef} className="p-8">
            <div>
              <Title level={3} className="text-center mb-2">
                {selectedCV?.cv?.fullName?.en || selectedCV?.username}
              </Title>
              <Text className="text-center block mb-4">
                {selectedCV?.cv?.position?.en}
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <List size="small" className="mb-4">
                    {selectedCV?.cv?.location?.en && (
                      <List.Item>
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <Text>{selectedCV?.cv?.location?.en}</Text>
                      </List.Item>
                    )}
                    {selectedCV?.cv?.availabilityForWork?.en && (
                      <List.Item>
                        <FaClock className="text-gray-500 mr-2" />
                        <Text>{selectedCV?.cv?.availabilityForWork?.en}</Text>
                      </List.Item>
                    )}
                    {(selectedCV?.cv?.phoneNumber || selectedCV?.phoneNumber) && (
                      <List.Item>
                        <FaPhone className="text-gray-500 mr-2" />
                        <Text>{selectedCV?.cv?.phoneNumber || selectedCV?.phoneNumber}</Text>
                      </List.Item>
                    )}
                    {selectedCV?.email && (
                      <List.Item>
                        <MdEmail className="text-gray-500 mr-2" />
                        <Text>{selectedCV?.email}</Text>
                      </List.Item>
                    )}
                  </List>
                </div>

                <div>
                  {selectedCV?.cv?.experience?.en && (
                    <>
                      <Text strong className="block mb-1">
                        Experience:
                      </Text>
                      <Text className="block mb-3">
                        {selectedCV?.cv?.experience?.en}
                      </Text>
                    </>
                  )}
                  {selectedCV?.cv?.nationality?.en && (
                    <>
                      <Text strong className="block mb-1">
                        Nationality:
                      </Text>
                      <Text className="block mb-3">
                        {selectedCV?.cv?.nationality?.en}
                      </Text>
                    </>
                  )}
                  {selectedCV?.cv?.salaryExpectation?.en && (
                    <>
                      <Text strong className="block mb-1">
                        Salary Expectation:
                      </Text>
                      <Text className="block mb-3">
                        {selectedCV?.cv?.salaryExpectation?.en}
                      </Text>
                    </>
                  )}
                  {selectedCV?.cv?.description?.en && (
                    <>
                      <Text strong className="block mb-1">
                        Description:
                      </Text>
                      <Text>{selectedCV?.cv?.description?.en}</Text>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Details;
