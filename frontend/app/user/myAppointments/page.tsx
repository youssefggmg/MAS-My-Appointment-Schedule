import { cookies } from "next/headers";
import AppointmentComponent from "@/components/usercomponents/Appointment-card"
import Navbar from "@/components/usercomponents/header";
import Footer from "@/components/usercomponents/footer";

const userAppointments = async (token: string) => {
    const result = await fetch("http://localhost:3060/api/appointment/allApointments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            'Cache-Control': 'no-store'
        },
        cache:"no-store"
    })
    const data = await result.json()
    return data
}

const page = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "No token found";
    const appointments = await userAppointments(token)

    return (
        <>
        <Navbar/>
            {appointments.allAppointments.map((appointment: any, index: number) => {
                return (
                    <div key={index}>
                        <AppointmentComponent
                        image= {appointment.providerId.Image}
                        title={appointment.serviceId.name}
                        date={appointment.date}
                        appointmentId={appointment._id}
                        description={appointment.serviceId.description}
                        status={appointment.status}
                        token = {token}

                        />
                    </div>
                )
            })}
            <Footer/>
        </>
    )
}

export default page
