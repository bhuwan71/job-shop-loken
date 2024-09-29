import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { setLocalStorageItem } from '../../utils/localStorageUtil';
import apiInstance from '../../api/api';
import { encryptToken } from '../../utils/cryptoUtils';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/auth';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

type LoginFormInput = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const { setUser } = useContext(AuthContext);

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      setLoading(true);
      const res = await apiInstance.post('admin/login', data);
      if (res) {
        setLoading(false);
        const encryptedToken = encryptToken(res.data.access_token);
        const isLoggedIn = encryptToken('true');
        setLocalStorageItem('access_token', encryptedToken);
        setLocalStorageItem('isloggedIn', isLoggedIn);
        setLocalStorageItem('jobPortal__user', isLoggedIn);
        navigate('/dashboard');
        toast.success('Login Successfully', {
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
    } catch (error) {
      setLoading(false);
      toast.error(`Login failed: ${error}`, {
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
    <div
      className="font-[sans-serif] text-[#333]"
      style={{
        backgroundImage:
          'url(https://img.freepik.com/free-photo/wavy-black-white-background_23-2150530922.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715990400&semt=ais_user)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="border bg-white border-gray-300 rounded-md p-6 max-w-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold">Sign in</h3>
              <p className="text-sm mt-4">
                Sign in to your account and explore a world of possibilities.
                Your journey begins here.
              </p>
            </div>
            <div>
              <label className="text-sm mb-2 block">User name</label>
              <div className="relative flex items-center">
                <input
                  {...register('email', { required: 'User name is required' })}
                  type="text"
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                  placeholder="Enter user name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              {errors.email && (
                <p className="text-meta-1 py-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-4"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="text-meta-1 py-1">{errors.password.message}</p>
              )}
            </div>
            {/* <div className="flex items-center justify-between gap-2">
              <div className="text-sm">
                <Link to="/forgot-password">
                  <span className="text-blue-600 hover:underline">
                    Forgot your password?
                  </span>
                </Link>
              </div>
            </div> */}
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none"
              >
                {loading ? 'Logging In...' : 'Log in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
