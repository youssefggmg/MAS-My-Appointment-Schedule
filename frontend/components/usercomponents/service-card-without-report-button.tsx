"use client"
import Image from "next/image";
import { book } from "@/serveractions/bookeapointment";
import { useState } from "react";

interface ServiceCardProps {
    imageUrl: string;
    title: string;
    description: string;
    price: number;
    serviceID: string;
    worktime: string;
    providerID: string;
    token: string;
}

export default function ServiceCardNoReport({
    imageUrl,
    title,
    description,
    price,
    serviceID,
    worktime,
    providerID,
    token
}: ServiceCardProps) {
    const [loading, setLoading] = useState(false); // State for loading

    const bookAppointmen = async (providerId: string, serviceId: string, token: string) => {
        setLoading(true); // Set loading to true
        try {
            await book(providerId, token, serviceId);
            alert("Your appointment has been booked!");
        } catch (error) {
            console.error(error);
            alert("An error occurred while booking your appointment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch border-2 border-black rounded-lg overflow-hidden bg-white shadow-md">
                {/* service image */}
                <div className="w-full sm:w-auto p-4 flex items-center justify-center sm:justify-start">
                    <Image
                        alt={title}
                        className="object-cover rounded-lg"
                        height={80}
                        width={80}
                        src={imageUrl}
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
                {/* service content */}
                <div className="flex-grow p-4 flex flex-col justify-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{description}</p>
                </div>
                {/* service actions */}
                <div className="w-full sm:w-auto p-4 flex flex-col justify-center items-center sm:items-end gap-2">
                    <div className="flex flex-col items-center sm:items-end w-full">
                        {/* Show work time above buttons */}
                        <p className="text-sm sm:text-base text-gray-500 mb-2">{worktime}</p>

                        {/* buttons */}
                        <button
                            className={`w-full mb-2 px-4 py-2 rounded transition-colors ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                            data-id={serviceID}
                            onClick={() => bookAppointmen(providerID, serviceID, token)}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="white" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
                            ) : (
                                'Book'
                            )}
                        </button>
                    </div>
                    {/* price */}
                    <p className="text-lg sm:text-2xl font-bold">${price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
