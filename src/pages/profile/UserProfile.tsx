import { BsTelephoneFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import PieChart from '../../components/charts/PieChart';
import React from 'react';
import { Divider, Space, Tag } from 'antd';
import TrendChart from '../../components/charts/TrendChart';

const UserProfile = () => {
    let { id } = useParams();
    const chartData = [30, 40, 35, 50, 49, 360, 70, 91, 125];
    const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];


    const chartDataTrend = [30, 40, 35, 50, 49, 60, 70, 91, 125];
    const chartLabelsTrend = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

    return (
        <>
            {/* component */}
            <link
                rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
            />
            <link
                rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
            />
            <main className="profile-page">
                <section className="relative block h-500-px">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                'url("https://st4.depositphotos.com/3930503/30199/i/450/depositphotos_301993972-stock-photo-financial-planning-money-growth-concept.jpg")'
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        />
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={{ transform: "translateZ(0px)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x={0}
                            y={0}
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src="data:image/jpeg;base64,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"
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full my-2 lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">


                                        <div className='shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-md   my-3  p-2'>
                                            <h2 className='text-meta-4 font-satoshi  font-medium uppercase text-lg '> General saving Account</h2>
                                            <p className='py-2 text-black font-bold text-xs'>4123120938129038123</p>
                                            <span>
                                                <span className='text-black-2  font-bold'>NPR</span>  12.49</span>

                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className='   my-3  p-3'>
                                            <h2 className='text-black font-bold uppercase text-md '>Kartik krain</h2>
                                            <p className='py-2 text-xs font-bold'>
                                                Accounnt Type:
                                                <Tag className='mx-2' color="magenta">Saral</Tag>
                                            </p>
                                            <p className='py-2 text-xs font-bold'>
                                                Location:
                                                <Tag className='mx-2' color="orange">KTM</Tag>
                                            </p>

                                            <p className='py-2 text-xs font-bold'>
                                                Email:
                                                <Tag className='mx-2' color="lime">karan@gmil.com</Tag>
                                            </p>

                                            <p className='py-2 text-xs font-bold'>
                                                Phone Number:
                                                <Tag className='mx-2' color="purple">94282342123</Tag>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-center ">


                                    <p className="mb-4 text-lg pt-10 leading-relaxed text-blueGray-700">
                                        An artist of considerable range, Jenna the name taken by
                                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                        performs and records all of his own music, giving it a warm,
                                        intimate feel with a solid groove structure. An artist of
                                        considerable range.
                                    </p>
                                </div>
                                <div className="mt-10 pt-10 border-t border-blueGray-200 text-center">
                                </div>

                                <div className='grid lg:grid-cols-2 pb-10 gap-5'>
                                    <div className='bg-white rounded-2xl p-2 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] '>
                                        <h1 className='text-black font-bold py-2 text-lg'>Total Deposit Month</h1>
                                        <div className='py-1'>
                                            <PieChart data={chartData} labels={chartLabels} />
                                        </div>
                                    </div>
                                    <div className='bg-white p-2 shadow-3'>
                                        <h1 className='text-black font-bold py-2 text-xs'>Total Deposit Month</h1>
                                        <div className='py-1'>
                                            <TrendChart data={chartData} labels={chartLabels} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>

    )
}

export default UserProfile