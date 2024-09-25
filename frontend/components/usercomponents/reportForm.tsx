"use client";
import { report } from "@/serveractions/report";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ProviderIdProps {
    providerid: string;
    token: string;
}

interface ReportFormInputs {
    report: string;
}

export default function Modal({ providerid, token }: ProviderIdProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    // Use React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm<ReportFormInputs>();

    // Toggle modal visibility
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit: SubmitHandler<ReportFormInputs> = async (reason) => {
        setLoading(true); // Start loading animation
        try {
            const res = await report(providerid, reason.report, token);
            console.log(res);
            alert("Report submitted successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to submit the report");
        } finally {
            setLoading(false); // End loading animation
            toggleModal();
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="w-full px-4 py-2 bg-red-400 text-black border font-bold border-black rounded hover:bg-gray-100 transition-colors"
            >
                Report
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
                    <div
                        id="authentication-modal"
                        className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg"
                        onClick={toggleModal} // Close modal on background click
                    >
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
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="report"
                                            className="block mb-2 text-sm font-medium text-black"
                                        >
                                            Your report
                                        </label>
                                        <input
                                            type="text"
                                            id="report"
                                            {...register("report", {
                                                required: "This field is required",
                                                minLength: {
                                                    value: 10,
                                                    message: "Your report must be at least 10 characters long",
                                                }
                                            })}
                                            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Your report here"
                                        />
                                        {/* Display validation errors */}
                                        {errors.report && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.report.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit button with loading animation */}
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        disabled={loading} // Disable button while loading
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
                                            "Submit report"
                                        )}
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
