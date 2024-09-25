"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { update } from "@/serveractions/updateUserinfo";

interface UserInfoFormData {
    name?: string; 
    password?: string; 
    phoneNumber?: string; 
    file?: FileList; 
}

interface UserProps {
    token: string;
}

const UserInfoForm: React.FC<UserProps> = ({ token }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInfoFormData>();

    const onSubmit = async (data: UserInfoFormData) => {
        setLoading(true); 
        try {
            const response = await update(data, token);
            console.log(response); // Handle response if needed
            setModalOpen(false); 
        } catch (error) {
            console.error("Error updating user info:", error); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <button
                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => setModalOpen(true)} // Open modal on button click
            >
                Edit Info
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit User Info</h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                                    onClick={() => setModalOpen(false)} // Close modal on button click
                                >
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-4 md:p-5">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register('name')}
                                            className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            {...register('password', {
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password must be at least 6 characters',
                                                },
                                            })}
                                            className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="••••••••"
                                        />
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            {...register('phoneNumber', {
                                                minLength: {
                                                    value: 10,
                                                    message: 'Phone number must be 10 digits',
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: 'Phone number must be 10 digits',
                                                },
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Phone number must be numeric and 10 digits',
                                                },
                                            })}
                                            className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="1234567890"
                                        />
                                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                                    </div>

                                    {/* Image */}
                                    <div>
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            {...register('file')} 
                                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                        />
                                        {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading} // Disable button when loading
                                        className={`w-full bg-pink-500 active:bg-pink-600 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded ease-linear transition-all duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1.2rem"
                                                height="1.2rem"
                                                viewBox="0 0 24 24"
                                                className="inline-block"
                                            >
                                                <path
                                                    fill="white"
                                                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                                                >
                                                    <animateTransform
                                                        attributeName="transform"
                                                        dur="0.75s"
                                                        repeatCount="indefinite"
                                                        type="rotate"
                                                        values="0 12 12;360 12 12"
                                                    />
                                                </path>
                                            </svg>
                                        ) : (
                                            "Update Info"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfoForm;
