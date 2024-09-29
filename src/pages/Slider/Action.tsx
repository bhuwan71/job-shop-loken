import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import Breadcrumb from '../../components/Breadcrumb';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastOptions, toast } from 'react-toastify';
import { UserRole } from '../../enum/UserRoles';
import apiInstance from '../../api/api';

interface FormData {
  title: string;
  image: UploadFile;
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

const SliderAction: React.FC = () => {
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

  const handleCancel = () => setPreviewOpen(false);

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      formData.append('image', fileList[0]?.originFileObj);
    }
    formData.append('title', data.title);
    formData.append('path', UserRole.User);

    try {
      let promise;
      if (id) {
        promise = apiInstance.patch(`/slider/${parseInt(id)}`, formData);
      } else {
        promise = apiInstance.post('/slider', formData);
      }

      const toastMessage = id ? 'Slider Update Successfully' : 'Slider Added';
      await toast.promise(promise, {
        pending: id ? 'Updating Slider...' : 'Adding Slider...',
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

      navigate('/slider');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, setValue]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(
        `/slider/${parseInt(id as string)}`,
      );
      if (response) {
        setValue('title', response?.data?.data?.title);
        setFileList([
          {
            uid: '-1',
            name: response?.data?.data?.photo_url,
            status: 'done',
            url: response?.data?.data?.photo_url,
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Slider" />
      <div className="bg-white p-4 rounded-xl shadow-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  gap-5 flex-col lg:flex-row">
            <div className="mb-5.5 w-full ">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="age"
              >
                Slider Title
              </label>
              <input
                className={`w-full rounded border ${
                  errors.title ? 'border-error' : 'border-stroke'
                } bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                type="text"
                {...register('title', {
                  required: 'Slider Title is required',
                })}
              />
              {errors.title && (
                <span className="text-error text-danger text-sm mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 px-2">
            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="image"
              >
                Slider Image
              </label>
              <Upload
                action=""
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </div>
          <div className="flex justify-end gap-4.5">
            <button
              className="flex text-white justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit"
            >
              {id ? <>Update</> : <>Save</>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SliderAction;
function getBase64(arg0: RcFile): string | PromiseLike<string | undefined> | undefined {
  throw new Error('Function not implemented.');
}

