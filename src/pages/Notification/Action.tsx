import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import Breadcrumb from '../../components/Breadcrumb';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastOptions, toast } from 'react-toastify';
import apiInstance from '../../api/api';
import { IoSend } from 'react-icons/io5';
interface FormData {
  title: string;
  body: string;
  type: string;
  img: UploadFile;
}

interface CustomToastPromiseOptions {
  pending: string;
  success: string;
  error: string;
  position?: ToastOptions['position'];
  autoClose?: ToastOptions['autoClose'];
  hideProgressBar?: ToastOptions['hideProgressBar'];
  closeOnClick?: ToastOptions['closeOnClick'];
  pauseOnHover?: ToastOptions['pauseOnHover'];
  draggable?: ToastOptions['draggable'];
  progress?: ToastOptions['progress'];
  theme?: ToastOptions['theme'];
}

const NotificationAction: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const beforeUpload = (file: RcFile): boolean => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }

    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must be smaller than 1MB!');
      return false;
    }

    return true; // Allow upload
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // const formData = new FormData();
    // if (fileList.length > 0 && fileList[0]?.originFileObj) {
    //   formData.append('img', fileList[0]?.originFileObj);
    // }
    // formData.append('title', data.title);
    // formData.append('body', data.body);
    // formData.append('type', data.type);
    try {
      let promise;
      if (id) {
        promise = apiInstance.patch(`/job-category/${parseInt(id)}`, data);
      } else {
        promise = apiInstance.post('/notification', data);
      }

      const toastMessage = id
        ? 'Notification Updated Successfully'
        : 'Notification Send';
      await toast.promise(promise, {
        pending: id ? 'Updating Notification...' : 'Adding Notification...',
        success: toastMessage,
        error: 'Error',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      } as CustomToastPromiseOptions);

      navigate('/notification');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, setValue]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(
        `/notification/${parseInt(id as string)}`,
      );
      if (response) {
        setValue('title', response?.data?.data?.title);
        setValue('body', response?.data?.data?.body);
        setValue('type', response?.data?.data?.type);
        setFileList([
          {
            uid: '-1',
            name: response?.data?.data?.img,
            status: 'done',
            url: response?.data?.data?.img,
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Breadcrumb pageName="Notification" />
      <div className="bg-white p-4 rounded-xl shadow-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 flex-col lg:flex-row">
            <div className="mb-5.5 w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className={`w-full rounded border ${
                  errors.title ? 'border-error' : 'border-stroke'
                } bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                type="text"
                {...register('title', {
                  required: 'Category Title is required',
                })}
              />
              {errors.title && (
                <span className="text-error text-danger text-sm mt-1">
                  {errors?.title?.message}
                </span>
              )}
            </div>

            <div className="mb-5.5 w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="type"
              >
                Type
              </label>
              <select
                className={`w-full rounded border ${
                  errors.type ? 'border-error' : 'border-stroke'
                } bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                {...register('type', {
                  required: 'Category Type is required',
                })}
              >
                <option value="">Select Type</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
              </select>
              {errors.type && (
                <span className="text-error text-danger text-sm mt-1">
                  {errors?.type?.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-5.5 w-full">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className={`w-full rounded border ${
                errors.body ? 'border-error' : 'border-stroke'
              } bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
              rows={5}
              cols={100}
              {...register('body', {
                required: 'Category Description is required',
              })}
            />
            {errors.body && (
              <span className="text-error text-danger text-sm mt-1">
                {errors?.body?.message}
              </span>
            )}
          </div>
          
          {/* <Upload
            action=""
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload> */}

          <div className="flex justify-end gap-4.5">
            <button
              className="flex justify-center items-center gap-2 rounded bg-black py-2 px-6 font-medium text-white hover:shadow-1"
              type="submit"
            >
              Send
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NotificationAction;
function getBase64(
  arg0: RcFile,
): string | PromiseLike<string | undefined> | undefined {
  throw new Error('Function not implemented.');
}
