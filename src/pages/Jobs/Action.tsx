import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import apiInstance from '../../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  position: string;
  location: string;
  phoneNumber: string;
  workType: string;
  companyName: string;
  numberOfVacancies: number;
  experience: string;
  facility: string[];
  requirements: string[];
  description: string;
  language: string;
  salaryType: string;
  salary: number;
  jobCategory: any; // Use 'any' if the structure of jobCategory is unknown. Replace with a more specific type if needed.
  applicationDeadLine: string;
}

const JobAction: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [facilityTags, setFacilityTags] = useState<string[]>([]);
  const [requirementTags, setRequirementTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      const Data = {
        ...data,
        salary: Number(data?.salary),
        numberOfVacancies: Number(data?.numberOfVacancies),
        facility: facilityTags,
        requirements: requirementTags,
      };
      let response;
      if (id) {
        response = await apiInstance.patch(`/jobs/${id}`, Data);
      } else {
        response = await apiInstance.post('/jobs', Data);
      }

      toast.success(`Job ${id ? 'updated' : 'added'} successfully!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      navigate('/jobs');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred while submitting the form.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`/jobs/${id}`);
      if (response) {
        const jobData = response.data;
        setValue('position', jobData.position.en);
        setValue('location', jobData.location.en);
        setValue('phoneNumber', jobData.phoneNumber.en);
        setValue('workType', jobData.workType.en);
        setValue('companyName', jobData.companyName.en);
        setValue('numberOfVacancies', parseInt(jobData.numberOfVacancies));
        setValue('experience', jobData.experience.en);
        setFacilityTags(jobData.facility.en);
        setRequirementTags(jobData.requirements.en);
        setValue('description', jobData.description.en);
        setValue('language', jobData.language.en);
        setValue('salaryType', jobData.salaryType.en);
        setValue('salary', parseInt(jobData.salary));
        setValue('jobCategory', jobData?.jobCategory?.id);
        setValue(
          'applicationDeadLine',
          jobData.applicationDeadLine.split('T')[0],
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [categories, setCategories] = useState<any>([]);

  const fetchCategory = async () => {
    try {
      const res = await apiInstance.get(`/job-category`);
      if (res) {
        setCategories(res?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleAddTag = (tag: string, type: 'facility') => {
    if (type === 'facility') {
      setFacilityTags([...facilityTags, tag]);
    }
  };

  const handleRemoveTag = (index: number, type: 'facility') => {
    if (type === 'facility') {
      setFacilityTags(facilityTags.filter((_, i) => i !== index));
    }
  };
  const handleRequirementChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, checked } = event.target;
    if (checked) {
      setRequirementTags([...requirementTags, value]);
    } else {
      setRequirementTags(requirementTags.filter((tag) => tag !== value));
    }
  };
  const [today, setToday] = useState('');

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];
    setToday(currentDate);
  }, []);

  return (
    <>
      <Breadcrumb pageName="Job" />
      <div className="bg-white p-6 rounded-xl shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="position"
              >
                Job Title
              </label>
              <select
                id="position"
                className={`mt-1 block w-full rounded-md border ${
                  errors.position ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('position', { required: 'Job Title is required' })}
              >
                <option value="">Select job title</option>
                <option value="chef">Chef</option>
                <option value="sous_chef">Sous Chef</option>
                <option value="helper">Helper</option>
                <option value="apprentice">Apprentice</option>
                <option value="others">Others (Specify)</option>
                <option value="waiter">Waiter</option>
                <option value="dishwasher">Dishwasher</option>
                <option value="bartender">Bartender</option>
              </select>
              {errors.position && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.position.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="location"
              >
                Location
              </label>
              <select
                id="location"
                className={`mt-1 block w-full rounded-md border ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('location', { required: 'Location is required' })}
              >
                <option value="" disabled>
                  Select a location
                </option>
                <option value="averio">Averio</option>
                <option value="beja">Beja</option>
                <option value="braga">Braga</option>
                <option value="braganca">Bragança</option>
                <option value="porto">Porto</option>
                <option value="lisbon">Lisbon</option>
                <option value="coimbra">Coimbra</option>
                <option value="setubal">Setúbal</option>
                <option value="aveiro">Aveiro</option>
                <option value="guimaraes">Guimarães</option>
                <option value="faro">Faro</option>
                <option value="viana-do-castelo">Viana do Castelo</option>
                <option value="leiria">Leiria</option>
                <option value="sintra">Sintra</option>
                <option value="braga">Braga</option>
                <option value="cascais">Cascais</option>
                <option value="ponta-delgada">Ponta Delgada</option>
                <option value="evora">Évora</option>
                <option value="lagos">Lagos</option>
                <option value="santarém">Santarém</option>
                <option value="olhao">Olhão</option>
              </select>
              {errors.location && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.location.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                className={`mt-1 block w-full rounded-md border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('phoneNumber', {
                  required: 'Phone Number is required',
                })}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="workType"
              >
                Work Type
              </label>
              <select
                id="workType"
                className={`mt-1 block w-full rounded-md border ${
                  errors.workType ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('workType', {
                  required: 'Work Type is required',
                })}
              >
                <option value="" disabled>
                  Select a work type
                </option>
                <option value="fulltime">Fulltime</option>
                <option value="part-time">Part-time</option>
                <option value="summer">Summer Worker</option>
              </select>
              {errors.workType && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.workType.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="companyName"
              >
                Company Name
              </label>
              <input
                id="companyName"
                className={`mt-1 block w-full rounded-md border ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('companyName', {
                  required: 'Company Name is required',
                })}
                placeholder="Enter company name"
              />
              {errors.companyName && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.companyName.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="numberOfVacancies"
              >
                Number of Vacancies
              </label>
              <input
                type="number"
                id="numberOfVacancies"
                className={`mt-1 block w-full rounded-md border ${
                  errors.numberOfVacancies
                    ? 'border-red-500'
                    : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('numberOfVacancies', {
                  required: 'Number of Vacancies is required',
                })}
                placeholder="Enter the number of vacancies"
              />
              {errors.numberOfVacancies && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.numberOfVacancies.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="experience"
              >
                Experience
              </label>
              <select
                id="experience"
                className={`mt-1 block w-full rounded-md border ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('experience', {
                  required: 'Experience is required',
                })}
              >
                <option value="" disabled>
                  Select experience level
                </option>
                <option value="6 month">6 months</option>
                <option value="1 year">1 year</option>
                <option value="2 year">2 years</option>
                <option value="3 year">3 years</option>
                <option value="more than 3 year">More than 3 years</option>
              </select>
              {errors.experience && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.experience.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="facility"
              >
                Facility
              </label>
              <div className="flex flex-wrap gap-2 mt-1">
                {facilityTags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white rounded-full px-4 py-1 text-xs flex items-center"
                  >
                    <span className="truncate">{tag}</span>
                    <button
                      type="button"
                      className="ml-2 text-white bg-red-600 rounded-full p-1 h-5 w-5 flex items-center justify-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={() => handleRemoveTag(index, 'facility')}
                      aria-label="Remove tag"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Add facility"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = (e.target as HTMLInputElement).value;
                    if (value && !facilityTags.includes(value)) {
                      handleAddTag(value, 'facility');
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>
            <div className="w-full lg:col-span-2">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                className={`mt-1 block w-full rounded-md border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('description', {
                  required: 'Description is required',
                })}
                placeholder="Enter job description"
              />
              {errors.description && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="language"
              >
                Language
              </label>
              <select
                id="language"
                className={`mt-1 block w-full rounded-md border ${
                  errors.language ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('language', { required: 'Language is required' })}
              >
                <option value="" disabled>
                  Select a language
                </option>
                <option value="english">English</option>
                <option value="portuguese">Portuguese</option>
                <option value="both">English and Portuguese</option>
                <option value="no need">No need</option>
              </select>
              {errors.language && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.language.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="salaryType"
              >
                Salary Type
              </label>
              <select
                id="salaryType"
                className={`mt-1 block w-full rounded-md border ${
                  errors.salaryType ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('salaryType', {
                  required: 'Salary Type is required',
                })}
              >
                <option value="" disabled>
                  Select salary type
                </option>
                <option value="basic">Basic</option>
                <option value="negotiable">Negotiable</option>
              </select>
              {errors.salaryType && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.salaryType.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                className={`mt-1 block w-full rounded-md border ${
                  errors.salary ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('salary', { required: 'Salary is required' })}
                placeholder="Enter salary amount"
              />
              {errors.salary && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.salary.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="jobCategory"
              >
                Job Category
              </label>
              <select
                id="category"
                className={`mt-1 block w-full rounded-md border ${
                  errors.jobCategory ? 'border-red-500' : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                defaultValue=""
                {...register('jobCategory', {
                  required: 'Category is required',
                })}
              >
                <option value="" disabled>
                  Select a work type
                </option>
                {categories?.map((category: any) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name?.en}
                  </option>
                ))}
              </select>

              {errors.jobCategory && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors?.jobCategory.message as any}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="requirements"
              >
                Requirements
              </label>
              <div className="flex flex-col gap-2 mt-1">
                {[
                  'Resident permit',
                  'Hardworking',
                  'Willingness to learn',
                  'Preparation of resident permit',
                  'Fast worker',
                  'Work under pressure',
                ]?.map((requirement) => (
                  <label
                    key={requirement}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={requirement}
                      checked={requirementTags.includes(requirement)}
                      onChange={handleRequirementChange}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">{requirement}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="applicationDeadLine"
              >
                Application Deadline
              </label>
              <input
                type="date"
                id="applicationDeadLine"
                className={`mt-1 block w-full rounded-md border ${
                  errors.applicationDeadLine
                    ? 'border-red-500'
                    : 'border-gray-300'
                } py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                {...register('applicationDeadLine', {
                  required: 'Application Deadline is required',
                })}
                min={today}
              />
              {errors.applicationDeadLine && (
                <span className="text-meta-1 text-xs mt-1">
                  {errors.applicationDeadLine.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              className={`flex bg-black cursor-pointer justify-center items-center rounded-md py-2 px-6 font-medium text-white transition-all duration-200 ${
                loading
                  ? 'bg-body cursor-not-allowed'
                  : 'bg-graydark hover:bg-boxdark'
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : id ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobAction;
