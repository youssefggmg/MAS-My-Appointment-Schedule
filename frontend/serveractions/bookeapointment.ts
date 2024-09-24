
export const book=async (data:string) => {
    try {
        
    } catch (error:any) {
        console.error(error.message);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
    
}