'use client'
import {SubmitHandler, useForm } from 'react-hook-form';
import Header from '@/components/ui/header';
import Link from 'next/link';


export default function SignUp() {
  interface SignUpFormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  
  const onSubmit:SubmitHandler<SignUpFormData> = (data:SignUpFormData) => {
    console.log(data);
    // handle sign up logic here
  };

  return (
    <>
      <Header />
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">Create your account.</h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      className="form-input w-full text-gray-300"
                      placeholder="First and last name"
                      {...register('fullName', { required: 'Full name is required' })}
                    />
                    {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="phone-number">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone-number"
                      type="text"
                      className="form-input w-full text-gray-300"
                      placeholder="0612345678"
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Phone number must be 10 digits',
                        },
                      })}
                    />
                    {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full text-gray-300"
                      placeholder="you@yourcompany.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: 'Enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-input w-full text-gray-300"
                      placeholder="Password (at least 8 characters)"
                      {...register('password', {
                        required: 'Password is required sss',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters long',
                        },
                      })}
                    />
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" type="submit">
                      Sign up
                    </button>
                  </div>
                </div>
              </form>

              <div className="text-gray-400 text-center mt-6">
                Already have an account?{' '}
                <Link href="/signin" className="text-green-500 hover:text-gray-200 transition duration-150 ease-in-out">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
