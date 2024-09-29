import React from 'react';
import { pageNotFoundLabel } from '../localization/common/404';
import useLang from '../hooks/useLang';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    const { lang } = useLang();

    return (
        <div className="my-10 py-10">
            <div className="py-10">
                <p className="text-center font-helvetica-rounded font-bold text-4xl text-blue-600">
                    404
                </p>
                <div className="flex items-center justify-center">
                    <p className="text-sm">{pageNotFoundLabel?.opps?.[lang]} &nbsp;</p>
                    <p className="text-lg">{pageNotFoundLabel?.pageNotFound?.[lang]}</p>
                </div>

                <p className="text-center">{pageNotFoundLabel?.pageNotFoundDescription?.[lang]}</p>

                <div className="flex items-center justify-center">
                    <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <IoArrowBack /> &nbsp; {pageNotFoundLabel?.goBack?.[lang]}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
