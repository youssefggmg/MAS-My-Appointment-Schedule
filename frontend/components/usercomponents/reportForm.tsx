"use client"
import { useState } from "react";
interface providerid{
    providerid:string
}

export default function Modal({providerid}:providerid) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="w-full px-4 py-2 bg-red-400 text-black border font-bold border-black rounded hover:bg-gray-100 transition-colors"
            >
                Report
            </button>
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
                    <div
                        id="authentication-modal"
                        className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg"
                        onClick={toggleModal} // Close modal on background click
                    >
                        {/* Modal content */}
                        <div
                            className="relative bg-white rounded-lg shadow"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        >
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-black">
                                    Report Form
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" action="#">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-black"
                                        >
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Submit report
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
