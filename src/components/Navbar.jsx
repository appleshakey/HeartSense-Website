'use client';
import { useRouter } from "next/navigation";
export default function Navbar(){
    const router = useRouter();
    return (
        <div className="px-10 py-5 bg-primary shadow-lg fixed w-[100vw] flex justify-between z-10">
            <button className="text-2xl text-white" onClick={() => router.push("/")}>
                HeartSense
            </button>
            <div className="flex text-white font-staat text-lg gap-5">
                <button onClick={() => router.push("/home")}>Home</button>
                <button onClick={() => router.push("/input-data")}>form</button>
                <button onClick={() => router.push("/file-upload")}>report</button>

                <button onClick={() => {
                    localStorage.removeItem('uid');
                    localStorage.removeItem('email');
                    router.push("/");
                }}>Logout</button>
            </div>
        </div>
    )
}