"use client"
import { useAuth } from "@/context/auth-context"

export default function LoginPage(){
const { isAuthenticated } = useAuth();


    return(
        <main className="w-full h-screen mt-[100px] px-7"> <div>Login Page</div>
        <div>{ isAuthenticated ? "Logged in" : "Not logged in"}</div>
        </main>

    )
}