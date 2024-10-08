"use client";

import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { forgetPassword } from '@/serveractions/auth';

interface ResetPasswordFormData {
  email: string;
}

export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>();
  const [sent, setSent] = useState(false);

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    const resolte:any = await forgetPassword(data);
    if (resolte.success) {
      setSent(true);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-4">Forgot your password?</h1>
            <p className="text-xl text-gray-400">We'll email you instructions on how to reset it.</p>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    className="form-input w-full text-gray-300" 
                    placeholder="you@yourcompany.com" 
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: { 
                        value: /^\S+@\S+$/i, 
                        message: "Invalid email address" 
                      } 
                    })} 
                    required 
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>
              {sent&&<p className="text-green-400 text-sm mt-1">we have sent an email to reset your password</p>}
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Reset Password</button>
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
