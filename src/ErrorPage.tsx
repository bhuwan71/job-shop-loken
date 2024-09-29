import React from 'react';
import { useEffect, useState } from 'react';
import { errorPageLabel } from "../src/localization/common/error";

const ErrorPage = () => {
    const refreshPage = () => {
        window.location.reload();
    };

    const lang = localStorage.getItem("microBank__lang") || ""; // Use || instead of ??

    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count > 0) {
            const interval = setInterval(() => {
                setCount(count - 1);
            }, 4000);
            return () => clearInterval(interval);
        }
        if (count === 0) {
            // refreshPage();
        }
    }, [count]);

    return (

        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white">
            <div className="text-center">
                <p className="text-slate-600 mt-5 lg:text-3xl">Oops something went wrong. Try to refresh this page or  feel free to contact us if the problem presists.</p>
            </div>
        </div>
    );
};

export default ErrorPage;
