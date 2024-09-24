"use client";

import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { changePassword } from '@/serveractions/auth';


interface ChangePasswordFormData {
    password: string;
    confirmPassword: string;
}

export default function ChangePassword() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<ChangePasswordFormData>();
    const [result, setResult] = useState(null);
    const params = useParams();
    const id=params.ID as string;

    const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
        const response:any = await changePassword({password:data.password},id);
        
        if (response.success) {
            setResult(response.data.message);
        }
    };

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1 mb-4">Change your password</h1>
                        <p className="text-xl text-gray-400">Enter a new password below to update your account.</p>
                    </div>

                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">New Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-input w-full text-gray-300"
                                        placeholder="Enter your new password"
                                        {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } })}
                                    />
                                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className="form-input w-full text-gray-300"
                                        placeholder="Confirm your new password"
                                        {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === watch("password") || "Passwords do not match" })}
                                    />
                                    {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            {result && <p className="text-green-400 text-sm mt-1">Your password has been changed successfully!</p>}

                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Change Password</button>
                                </div>
                            </div>
                        </form>

                        <div className="text-gray-400 text-center mt-6">
                            <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Cancel</Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
