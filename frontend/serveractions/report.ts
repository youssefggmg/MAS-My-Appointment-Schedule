export const report=async(providerId:string,reason:string,token:string)=>{
    const response=await fetch("http://localhost:3060/api/report/report",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({providerId,reason})
    })
    const data=await response.json()
}