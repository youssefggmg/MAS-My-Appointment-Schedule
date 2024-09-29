import { cookies } from "next/headers";

const userAppointments = async (token:string) => {
    const result = await fetch("http://localhost:3060/api/appointment/allApointments",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }
    })
    const data = await result.json()
    return data
}

const page = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "No token found";
    const appointments = await userAppointments(token)
    console.log(appointments);
    
    return (
        <div>
            <h1>Appointments</h1>

        </div>
    )
}

export default page
