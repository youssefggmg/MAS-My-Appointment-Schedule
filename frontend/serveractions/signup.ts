"use server"

interface SignUpFormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export const createAcount = async (data: SignUpFormData) => {
    try {
        const response = await fetch('http://localhost:3060/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        })
        if (!response.ok) {
            const error = await response.json();
            return error;
        }
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error.message)
    }
}