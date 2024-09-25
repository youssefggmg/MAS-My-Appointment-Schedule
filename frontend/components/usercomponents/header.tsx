"use client";

import { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const userinfo = JSON.parse(Cookies.get("user") || "{}");
    const userimage = userinfo.Image;
    console.log(userinfo.Image);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-whit mb-6 w-full z-20 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/user/dash" className="flex items-center space-x-3">
                    <Image
                        src="https://res.cloudinary.com/dxbvwgxvf/image/upload/v1726873186/mvukbfwhb6iwlvn2fqpj.jpg"
                        width={50}
                        height={50}
                        alt="application logo"
                    />
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0">
                    <Link href="/user/profile">
                        <Image
                            src={userimage}
                            width={50}
                            height={50}
                            alt="User profile"
                            className="rounded-full"
                        />
                    </Link>
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 md:flex-row md:mt-0 md:border-0 text-lg font-roboto">
                        <li>
                            <Link href="/" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/user/appointments" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">My Appointments</Link>
                        </li>
                        <li>
                            <Link href="/reports" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">Reports</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
