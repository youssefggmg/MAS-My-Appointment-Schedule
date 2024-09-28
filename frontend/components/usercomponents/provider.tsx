import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ServiceCardNoReport from './service-card-without-report-button';
import Modal from './reportForm';

interface Service {
    _id: string;
    providerId: string;
    name: string;
    description: string;
    workTime: string;
    city: string;
    availability: boolean;
    price: number;
    contactMethod: string;
    __v: number;
}

interface ProviderInfo {
    _id: string;
    providerId: string;
    jobTitle: string;
    aboutMe: string;
    availability: boolean;
    createdAt: string;
    __v: number;
}

interface Provider {
    name: string;
    email: string;
    Image: string;
    id: string;
    phoneNumber: string;
    services: Service[];
    providerInfo: ProviderInfo;
}

const Provider: React.FC<{ provider: Provider; token:string }> = ({ provider,token }) => {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <Image
                                    src={provider.Image}
                                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                                    width={128}
                                    height={128}
                                    alt='provider image'
                                />
                                <h1 className="text-xl font-bold">{provider.name}</h1>
                                {
                                    provider.providerInfo.availability ? <div className="flex items-center bg-green-100 p-2 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14l-4-4-4 4-1.41-1.41L12 10l5.41 5.41z" />
                                        </svg>
                                        <span className="text-green-600 font-bold">Available</span>
                                    </div> : <div className="flex items-center bg-red-100 p-2 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.41 14.41L12 12l-4.41 4.41L6.59 16l4.41-4.41L6.59 8l1.41-1.41L12 10l4.41-4.41L16.41 8l-4.41 4.41z" />
                                        </svg>
                                        <span className="text-red-600 font-bold">Unavailable</span>
                                    </div>
                                }

                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                                    Contact Info
                                </span>
                                <ul>
                                    <li className="mb-2">Phone: {provider.phoneNumber}</li>
                                    <li className="mb-2">Email: {provider.email}</li>
                                </ul>
                            </div>
                        <Modal
                        providerid={provider.id}
                        token={token}
                        />
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            <p className="text-gray-700">{provider.providerInfo.aboutMe}</p>
                            <h2 className="text-xl font-bold mt-6 mb-4">some of my services</h2>
                            {/* Assuming experience is an array within providerInfo */}
                            {
                                provider.services.map((service, index) => {
                                    return (
                                        <div key={index} className="  p-6 mb-4">
                                            <ServiceCardNoReport
                                            imageUrl={provider.Image}
                                            title={service.name}
                                            description={service.description}
                                            serviceID={service._id}
                                            worktime={service.workTime}
                                            providerID={provider.id}
                                            price={service.price}
                                            token={token}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Provider;
