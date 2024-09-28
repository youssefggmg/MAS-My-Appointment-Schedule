import React from 'react';
import Provider from '@/components/usercomponents/provider';
import { cookies } from "next/headers";
import Navbar from '@/components/usercomponents/header';
import Footer from '@/components/usercomponents/footer';


const getproviderInfo = async (id: string, token: string) => {
    const response = await fetch(`http://localhost:3060/api/provider/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
};

const page = async ({ params }: any) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "No token found";
    const ID = params.id;
    const providerInfoData = await getproviderInfo(ID, token);

    return (
        <>
            <Navbar />
            <Provider provider={providerInfoData}
                token={token}
            />
            <Footer />
        </>
    );
}

export default page;
