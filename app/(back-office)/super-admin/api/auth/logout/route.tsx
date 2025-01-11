import {NextResponse } from "next/server";


export async function POST() {
    const response = NextResponse.json({success:true,message:"Logout successfully"});
    response.cookies.delete("accessToken")
    return response;
}
