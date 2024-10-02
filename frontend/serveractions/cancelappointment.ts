export const canceleappointment = async (toekn:string,Id:string) => {
    const response = await fetch(`http://localhost:3060/api/appointment/cancel/${Id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${toekn}`
            }
        }
    )
    const data = await response.json()
    return data
}