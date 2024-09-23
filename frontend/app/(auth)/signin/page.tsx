"use client";

import Header from '@/components/ui/header'
import Link from 'next/link'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { signin } from '@/serveractions/auth';
import Cookies from 'js-cookie';
import { getRole } from '@/serveractions/auth';
import { useRouter } from 'next/navigation';
// Define types for form data
interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
  const [error, seterror] = useState(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    console.log(data);
    const resolt = await signin(data);
    console.log(resolt);

    if (resolt.success === false) {
      seterror(resolt.error);
    }
    else {
      const token = resolt.data.token;
      Cookies.set('token', token, { expires: 1, secure: true, path: '/' });
      const response = await getRole(token);
      const role = response!.data
      console.log(role);

      if (role === "user") {
        router.push('/user/dash');
      }
    }
  };

  return (
    <section className="relative">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Log in to your account</h1>
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
                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-300"
                    placeholder="Password (at least 8 characters)"
                    {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 10 characters" } })}
                  />
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                    <Link href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Don't have an account? <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
