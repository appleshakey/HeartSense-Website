'use client';
import Navbar from "@/components/Navbar";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/components/firebase";
import { useRouter } from "next/navigation";

export default function FileUpload(){
    const [file, setFile] = useState(null);
    const router = useRouter();
    const handleChange = (file) => {
      setFile(file);
    };

    const handleSubmit = (e) => {
        const pdfRef = ref(storage, `reports/${file.name}`); 
        uploadBytes(pdfRef, file).then((snapshot) => {
            console.log("uploaded successfully");
            router.push("/thankYou");
        })
    }   

    return (
        <div>
            <Navbar />
            <div className="pt-28">
                <div className="w-[100vw] h-[60vh] flex flex-col justify-center items-center gap-16">
                <h1 className="font-staat text-primary text-4xl">Submit Your Health Report</h1>
                <h3 className="font-staat text-primary text-2xl w-[40vw] text-center">Monitor Your Health. Stay Ahead.
                Regular health monitoring is key to maintaining a healthy lifestyle. Use this portal to submit your health data and track your progress. Keep your health records up to date and receive insights on how to improve your well-being.</h3>

                    <FileUploader handleChange={handleChange} name="file" types={["PDF"]}/>
                    <div>
                        <button onClick={(e) => handleSubmit(e)} className="text-primary font-staat text-xl bg-white px-3 py-2 shadow-lg rounded-lg hover:bg-primary hover:text-white transform-all">Submit</button>
                    </div>
                </div>
            </div>

        </div>
    )

}