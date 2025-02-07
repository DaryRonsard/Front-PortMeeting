import db from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest){


    const [utilisateur]:any = await db.query("SELECT * FROM utilisateurs");

    if(utilisateur && utilisateur.length > 0)
    {
        return NextResponse.json({success:true,data:utilisateur})
    }
    
    return NextResponse.json({success:false,data:[]})

    
}