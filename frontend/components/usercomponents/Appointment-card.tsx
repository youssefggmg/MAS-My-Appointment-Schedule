"use client"
import React, { useState } from 'react';
import { canceleappointment } from '@/serveractions/cancelappointment';
import { useRouter } from 'next/navigation';

interface AppointmentProps {
    image: string;
    title: string;
    date?: string;
    appointmentId: string;
    description: string;
    status: string;
    token: string;
}

export default function AppointmentComponent({
    image,
    title,
    date,
    appointmentId,
    description,
    status,
    token
}: AppointmentProps) {
    const [loading, setLoading] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(status); // Keep track of the appointment status after cancellation
    const router = useRouter();

    const isCanceled = updatedStatus === "canceled";
    const isPending = updatedStatus === "pending";
    const isAccepted = updatedStatus === "accepted";

    const statusColor = isCanceled ? 'text-red-500' : isPending ? 'text-yellow-500' : isAccepted ? 'text-green-500' : '';

    const handleCancelClick = async () => {
        setLoading(true);
        try {
            const result = await canceleappointment(token, appointmentId);
            if (result.success) {
                setUpdatedStatus('canceled'); // Update the status to canceled after successful cancellation
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error("An error occurred while canceling the appointment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                        alt="Profile picture"
                        className="rounded-full w-16 h-16 object-cover"
                        height="64"
                        src={image}
                        style={{
                            aspectRatio: "64/64",
                            objectFit: "cover",
                        }}
                        width="64"
                    />
                    <div className="flex flex-grow">
                        <div className="flex flex-col sm:flex-col sm:items-center justify-between mb-2 w-3/4">
                            <h2 className="text-2xl -ml-40 font-bold text-gray-800 py-6">{title}</h2>
                            <p className="text-sm text-gray-600 mb-2">{description}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center flex-col justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
                                <p className="text-sm text-gray-600">
                                    At: <span className="font-semibold text-blue-600">{date || 'not yet'}</span>
                                </p>
                                <p className={`text-sm ${statusColor} mt-1`}>
                                    {updatedStatus === "pending" && "Pending."}
                                    {updatedStatus === "accepted" && "Accepted."}
                                    {updatedStatus === "canceled" && "Canceled."}
                                </p>
                                <button
                                    className={`ml-4 px-4 py-2 mt-4 rounded transition-colors ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                                    onClick={handleCancelClick}
                                    disabled={loading || updatedStatus === "canceled"}
                                >
                                    {loading ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                                            <path fill="white" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                                                <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                            </path>
                                        </svg>
                                    ) : (
                                        'Cancel'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
