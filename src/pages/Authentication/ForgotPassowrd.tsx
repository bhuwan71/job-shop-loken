import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import apiInstance from '../../api/api';
type ForgotPasswordFormInput = {
  phone: string;
};

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInput>();

  const onSubmit: SubmitHandler<ForgotPasswordFormInput> = async (data) => {
    try {
      // Placeholder API endpoint, replace it with your actual endpoint
      const response = await apiInstance.post('/forgot-password', data);

      // Handle API response, e.g., show success message
      toast.success(response.data.message);
    } catch (error) {
      toast.error('');
    }
  };

  return (
    <div className="flex justify-center items-center h-[95vh] xl:h-[100vh]">
      <div className="w-full max-w-md p-6 rounded-xl shadow-xl  bg-white">
        <span className="lg:w-7/12 lg:mx-20 w-7/12 mx-10 px-2  h-2/12 lg:h-1/12 inline-block">
          {/* <img className='w-full h-full' src={logo} /> */}
        </span>
        <h2 className="text-xl font-bold mb-2">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium py-1 text-gray-600">
              Phone Number
            </label>
            <input
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: 'Invalid phone number',
                },
              })}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-primary"
            />
            {errors.phone && (
              <p className="text-danger text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
