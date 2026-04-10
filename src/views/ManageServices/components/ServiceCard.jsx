import React from 'react';
import CardCustom from '../../../components/CardCustom';
import { FaWifi } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";

const ServiceCard = ({ type, services, onClick }) => {
    const service = services[type];

    if (!service) {
        return null;
    }

    return (
        <div className='w-full md:w-1/4' onClick={onClick}>
            <CardCustom
                className={`cursor-pointer relative rounded-[2.5em] m-2 max-md:m-0 p-8 max-md:mt-5 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-md:w-full`}
            >
                <div className={`${service.bgIcon} text-xl absolute right-5 max-xl:right-2 max-md:right-7 p-2 rounded-full`}>
                    {service.subtitle == 'INTERNET' ? (
                        <FaWifi />
                    ) : (
                        <IoTvSharp />
                    )}
                </div>
                <div className='flex flex-col w-full'>
                    <p className={`${service.color} m-0 text-lg text-left`}>{service.subtitle}</p>
                </div>
            </CardCustom>
        </div>
    );
};

export default ServiceCard;

