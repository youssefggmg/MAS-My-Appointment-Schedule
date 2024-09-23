"use server"

interface SignUpFormData {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
}

interface SignInFormData {
    email: string;
    password: string;
}

interface ResetPasswordFormData {
    email: string;
}
export const createAcount = async (data: SignUpFormData) => {
    console.log("started");

    try {
        const response = await fetch('http://localhost:3060/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.name || "Something went wrong" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error: any) {
        console.error(error.message);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
};

export const signin = async (data: SignInFormData) => {
    try {
        const response = await fetch('http://localhost:3060/api/auth/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.message || "Something went wrong" };
        }
        const resolt = await response.json();
        return { success: true, data: resolt }
    } catch (error: any) {
        console.error(error.message);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
}

export const forgetPassword = async (data: ResetPasswordFormData) => {
    try {

        const response = await fetch("http://localhost:3060/api/auth/forgetpassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json(); 
            return { success: true, data: result }; 
        } 
    } catch (error: any) {
        console.error(error.message);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
};
export const changePassword= async (data:{ password: string },id:string) => {
    try {
        const response = await fetch(`http://localhost:3060/api/auth/changepassword/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.message || "Something went wrong" };
            }
        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result };
        }
    } catch (error:any) {
        console.error(error.message);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
}

export const getRole = async (token:string) => {
    try {
        const response = await fetch("http://localhost:3060/api/validate", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result.user.role };
        }
    } catch (error:any) {
        console.error(error.message);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
    
}
