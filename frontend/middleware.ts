import { NextRequest, NextResponse } from "next/server";

export const middeleWare =(request:NextRequest)=>{
    const token:string = JSON.parse(localStorage.getItem("token")as string) ;

    if (!token) {
        
    }

}