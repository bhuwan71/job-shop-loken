import Breadcrumb from '../../components/Breadcrumb';
import { AiFillLock } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';
import { ToastOptions, toast } from 'react-toastify';
import apiInstance from '../../api/api';

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
const AdminProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);
  const onSubmit = async (data: any) => {
    const addPromise = apiInstance.post('/change-password', {
      ...data,
    });
    await toast.promise(addPromise, {
      pending: 'Updating Password...',
      success: 'Password updated ',
      error: 'Error Updating Password',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    } as CustomToastPromiseOptions);
    reset();
  };

  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src="https://img.freepik.com/free-photo/coins-neatly-stacked-portray-investment-growth-fundamental-components-financial-prosperity_157027-2474.jpg?size=626&ext=jpg&ga=GA1.1.867424154.1698624000&semt=ais"
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {/* {user?.name as any}  */}
            </h3>
            <p className="font-medium">{""}</p>
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 py-4 px-4"
              >
                <div className="flex flex-col gap-10 lg:flex-row py-10">
                  <div className="py-4  flex flex-col gap-5  lg:w-[60%]">
                    {/* Change Password Section */}
                    <h4 className="text-md mb-4 flex gap-2 items-center font-bold text-black text-start">
                      <AiFillLock />
                      Change Password
                    </h4>
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block pb-2 text-start font-bold  text-sm  text-black"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        {...register('current_password', { required: true })}
                        className="w-full rounded border border-stroke bg-gray py-1 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      {errors.currentPassword && (
                        <span className="text-danger text-start">
                          Current Password is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block pb-2 text-start font-bold  text-sm  text-black"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        {...register('new_password', { required: true })}
                        className="w-full rounded border border-stroke bg-gray py-1 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      {errors.new_password && (
                        <span className="text-danger text-start">
                          New Password is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block pb-2 text-start font-bold  text-sm  text-black"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        {...register('confirm_password', {
                          validate: (value) =>
                            value === getValues('new_password') ||
                            'Passwords do not match',
                        })}
                        className="w-full rounded border border-stroke bg-gray py-1 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      {errors.confirm_password && (
                        <span className="text-danger text-start">
                          {/* {errors.confirm_password.message} */}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white bg-[#059668] rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
