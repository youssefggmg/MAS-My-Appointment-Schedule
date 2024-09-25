interface UserInfoFormData {
    name?: string;
    password?: string;
    phoneNumber?: string;
    file?: FileList;
}

export const update = async (data: UserInfoFormData, token: string) => {
    try {
        const formData = new FormData();

        if (data.name) formData.append('name', data.name);
        if (data.password) formData.append('password', data.password);
        if (data.phoneNumber) formData.append('phoneNumber', data.phoneNumber);

        // Check if there's a file and append it
        if (data.file && data.file.length > 0) {
            formData.append('file', data.file[0]); 
        }

        const response = await fetch('http://localhost:3060/api/user/updateinfo', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            body: formData 
        });

        if (!response.ok) {
            throw new Error(`Failed to update user info: ${response.statusText}`);
        }

        const result = await response.json(); 
        return result; 

    } catch (error: any) {
        console.error(error.message);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
};
