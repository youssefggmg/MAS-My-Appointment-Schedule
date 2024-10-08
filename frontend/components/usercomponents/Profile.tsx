import React from 'react';
import Image from 'next/image';
import UserInfoForm from './EditInfo';

interface ProfilePageProps {
    name: string;
    email: string;
    phoneNumber: string;
    profilImage: string;
    createdAt: string;
    token: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name, email, phoneNumber, profilImage, createdAt, token }) => {
    return (
        <div className="profile-page">
            {/* Main Profile Content */}
            <section className="py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center lg:justify-between items-center">
                                {/* Profile Image */}
                                <div className="w-full lg:w-3/12 px-4 flex justify-center">
                                    <div className="relative">
                                        <Image
                                            alt="Profile"
                                            src={profilImage}
                                            width={150}
                                            height={150}
                                            className="shadow-xl rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Account Creation Time */}
                                <div className="w-full lg:w-3/12 px-4 flex justify-center lg:justify-start mt-4 lg:mt-0">
                                    <div className="text-center lg:text-left">
                                        <p className="text-sm text-blueGray-400">Account created on:</p>
                                        <span className="text-lg font-semibold text-blueGray-700">{createdAt.substring(0,10)}</span>
                                    </div>
                                </div>

                                {/* Edit Info Button */}
                                <div className="w-full lg:w-3/12 px-4 lg:text-right mt-4 lg:mt-0 flex justify-center lg:justify-end">
                                    <UserInfoForm token={token} />
                                </div>
                            </div>

                            {/* Profile Information */}
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">{name}</h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                                    {email}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-phone-alt mr-2 text-lg text-blueGray-400"></i>
                                    {phoneNumber}
                                </div>
                            </div>

                            {/* Profile Description */}
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">zwaxescrdvtbynucdygcuyfitfsdycxydurxdvuxdutsdvtdvdvusdursdvut</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
