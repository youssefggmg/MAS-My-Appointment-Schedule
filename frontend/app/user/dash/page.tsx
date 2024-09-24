import { Metadata } from "next";
import Header from "@/components/usercomponents/header";
import SearchBar from "@/components/usercomponents/searchBare";
import ServiceCard from "@/components/usercomponents/service-card";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Home Page",
    description: "This is the user home page",
};

// Fetch services data from the API
const allservices = async () => {
    // Get the token from cookies inside the async function
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "No token found";

    const response = await fetch("http://localhost:3060/api/dash", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        console.log("Failed to fetch services");
    }

    const data = await response.json();
    return data;
};

const Dash = async () => {
    const allServices = await allservices();
    console.log(allServices.services[0].workTime);
    

    return (
        <>
            <Header />
            <div className="mx-36">
                <SearchBar />
                <div className="flex flex-wrap justify-center mt-8 gap-6">
                    {/* Check for errors or empty services list */}
                    {allServices.error ? (
                        <p className="text-lg text-green-600 bg-green-50 p-4 rounded-lg border border-green-300 max-w-md mx-auto">
                            {allServices.error}
                        </p>
                    ) : allServices.services.length === 0 ? (
                        <p className="text-lg text-red-600 bg-red-50 p-4 rounded-lg border border-red-300 max-w-md mx-auto">
                            No services available at the moment.
                        </p>
                    ) : (
                        // Loop through each service and render a ServiceCard
                        allServices.services.map((service: any) => (
                            <ServiceCard
                                key={service._id}
                                imageUrl={service.providerId.Image || "default-image-url"}
                                title={service.name}
                                description={service.description}
                                price={service.price}
                                serviceID={service._id}
                                worktime={service.workTime}
                                providerID={service.providerId._id}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Dash;
