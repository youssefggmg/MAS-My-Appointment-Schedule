
export const book = async (providerID: string, token: string,serviceID:string) => {
    try {
        const response = await fetch('https://example.com/api/appointment/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                providerID: providerID,
                serviceID: serviceID
                })
        })
        const data = await response.json()
        if (!data.ok) {
            throw new Error(data.message)
        }

    } catch (error: any) {
        console.error(error.message);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }

}