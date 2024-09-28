import Navbar from "@/components/usercomponents/header";
import { Metadata } from "next"
import ProfilePage from "@/components/usercomponents/Profile";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Profile Page",
    description: "This is the user profile page",
};
const cookieStore = cookies();
const token = cookieStore.get("token")?.value || "No token found";
const fetchUserIndo = async () => {
    const response = await fetch('http://localhost:3060/api/user/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
            'Cache-Control': 'no-store'
        },
        cache: 'no-store',
    })
    const data = await response.json();
    return data;
}


const Profile = async () => {
    const {
        _id,
        name,
        email,
        phoneNumber,
        Image,
        createdAt,
    } = await fetchUserIndo();


    return (
        <>
            <Navbar />
            <ProfilePage
                name={name}
                email={email}
                phoneNumber={phoneNumber}
                profilImage={Image}
                createdAt={createdAt}
                token={token}
            />
        </>
    )
}

export default Profile
