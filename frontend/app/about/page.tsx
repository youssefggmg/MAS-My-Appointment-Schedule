import Info from '@/components/info';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import React from 'react'

export const metadata = {
    title: 'About Us - My Appointment Schedule',
    description: 'Learn more about My Appointment Schedule, our mission to connect customers with service providers, and how we strive to make the booking process seamless and efficient.',
    keywords: 'appointment booking, service providers, customer service, scheduling platform, My Appointment Schedule',
    author: 'My Appointment Schedule Team',
};

const aboutPage = () => {
    return (
        <>
            <Header />
            <Info />
            <Footer />
        </>
    )
}

export default aboutPage;