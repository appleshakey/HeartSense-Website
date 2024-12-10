"use client";
import Navbar from "@/components/Navbar";
import  Select  from "@mui/material/Select";
import  MenuItem  from "@mui/material/MenuItem";
import { auth, db } from "../../components/firebase";
import { useRouter } from "next/navigation";
import { serverTimestamp, addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function InputData(){
    const uid = useSelector(state => state["auth"]["Token"]) || window.localStorage.getItem("uid");
    const router = useRouter();

    const [age, setAge] = useState("")
    // const [gender, setGender] = useState("");
    // const [totalCholestrol, setTotalCholestrol] = useState("");
    // const [hdlCholestrol, setHdlCholestrol] = useState("");
    // const [systollicBP, setSystollicBP] = useState("");
    // const [diastollicBP, setDiastollicBP] = useState("");
    // const [diabetes, setDiabetes] = useState("");
    // const [smoking, setSmoking] = useState("");
    const [sex, setSex] = useState("male");
    const [education, setEducation] = useState(false);
    const [currentSmoker, setCurrentSmoker] = useState(false);
    const [cigsPerDay, setCigsPerDay] = useState(false);
    const [BPMeds, setBPMeds] = useState("");
    const [prevalentStroke, setPrevalentStroke] = useState("");
    const [prevalentHyp, setPrevalentHyp] = useState("");
    const [diabetes, setDiabetes] = useState(false);
    const [totChol, setTotChol] = useState("");
    const [sysBP, setSysBP] = useState("");
    const [diaBP, setDiaBP] = useState("");
    const [heartRate, setHeartRate] = useState("");
    const [glucose, setGlucose] = useState("");
    const [BMI, setBMI] = useState("");
    const [ECGFile, setECGFile] = useState(undefined);  
    const [preview, setPreview] = useState(undefined);
    const [imgselected, setImgSelected] = useState(false);
    const [result, setResult] = useState(false);
    const [riskCategory, setRiskCategory] = useState("");
    const [probability, setProbability] = useState("");



    // const handleAgeChange = (event) => setAge(event.target.value)
    // const handleGenderChange = (event) => setGender(event.target.value)
    // const handleTotalCholestrolChange = (event) => setTotalCholestrol(event.target.value)
    // const handleHDLCholestrolChange = (event) => setHdlCholestrol(event.target.value)
    // const handleSystollicBPChange = (event) => setSystollicBP(event.target.value)
    // const handleDiastollicBPChange = (event) => setDiastollicBP(event.target.value)
    // const handleDiabetesChange = (event) => setDiabetes(event.target.value)
    // const handleSmokingChange = (event) => setSmoking(event.target.value)

    const handleFileChange = (e) => {   
        setECGFile(e.target.files[0]);
        const file = new FileReader();
        file.onload = () => {
            setPreview(file.result);
        }
        file.readAsDataURL(e.target.files[0])
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (uid) {
            const Rprediction = await fetch("http://localhost:8000/model/framingham_model/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },                
                body: JSON.stringify({
                age: age,
                sex: sex,
                education: education == "Yes",
                currentSmoker: currentSmoker == "Yes",
                cigsPerDay: cigsPerDay,
                BPMeds: BPMeds == "Yes",
                prevalentStroke: prevalentStroke == "Yes",
                prevalentHyp: prevalentHyp == "Yes",
                diabetes: diabetes == "Yes",
                totChol: totChol,
                sysBP: sysBP,
                diaBP: diaBP,
                BMI: BMI,
                heartRate: heartRate,
                glucose: glucose,
                })
            })
            const prediction = await Rprediction.json();
            const data = JSON.parse(prediction);
            console.log(data);
            setRiskCategory(data["risk_category"]);
            setProbability(data["probability"]);
            if(data){
                setResult(true);
            }

            const response = await addDoc(collection(db, "riskFactor"), {
                uid: uid,
                age: age,
                sex: sex,
                education: education,
                currentSmoker: currentSmoker,
                cigsPerDay: cigsPerDay,
                BPMeds: BPMeds,
                prevalentStroke: prevalentStroke,
                prevalentHyp: prevalentHyp,
                diabetes: diabetes,
                totChol: totChol,
                sysBP: sysBP,
                diaBP: diaBP,
                BMI: BMI,
                heartRate: heartRate,
                glucose: glucose,
                Timestamp: serverTimestamp(),
            });
        }
        else {
            console.log("no uid");
        }
    }


    return (
        <div>
            <Navbar />
            <div>
            {result && (
                    <div className="fixed w-[100vw] h-[100vh] flex justify-center items-center bg-transparent bg-slate-200 rounded-lg">
                        <div className="bg-white w-96 h-96 border-2 border-black flex justify-center items-center gap-10 rounded-lg">
                            <div>
                                Risk Category: {riskCategory}
                            </div>
                            <div>
                                Probability: {probability}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form className="pt-24 px-28 flex flex-col gap-28" onSubmit={(e) => handleFormSubmit(e)}>
                <div className="grid grid-cols-3 grid-rows-4 w-full gap-44" >
                    <div className="grid grid-cols-2 Age gap-36">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Age
                        </div>      
                        <div className="flex items-center">
                            <input type="number" className="h-20 border-2 border-gray-200 w-36" value={age} onChange={(e) => setAge(e.target.value)}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Sex
                        </div>      
                        <Select value={sex} onChange={(e) => setSex(e.target.value)} labelId="demo-simple-select-label" label="Age" className="w-36" required>
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            education
                        </div>      
                        <Select value={education} onChange={(e) => setEducation(e.target.value)} labelId="demo-simple-select-label" label="Age" className="w-36" required>
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            current <br/> smoker
                        </div>  
                        <Select value={currentSmoker} onChange={(e) => setCurrentSmoker(e.target.value)} labelId="demo-simple-select-label" label="Age" className="w-36" required>
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>    
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Cigerattes <br/> Per Day
                        </div>      
                        <div className="flex items-center">
                            <input type="number" value={cigsPerDay} onChange={(e) => setCigsPerDay(e.target.value)} className="h-20 border-2 border-gray-200 w-36"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Blood Pressure <br/> Meds
                        </div>      
                        <Select value={BPMeds} onChange={(e) => setBPMeds(e.target.value)} labelId="demo-simple-select-label" label="Age" className="w-36" required>
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Prevalent <br/> Stroke
                        </div>      
                        <Select value={prevalentStroke} onChange={(e) => setPrevalentStroke(e.target.value)} labelId="demo-simple-select-label" label="Age" className="w-36" required>
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            prevalentHyp
                        </div>      
                        <Select value={prevalentHyp} onChange={(e) => setPrevalentHyp(e.target.value)} labelId="demo-simple-select-label" label="Age" className="w-36" required>
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            diabetes
                        </div>      
                        <Select value={diabetes} onChange={(e) => setDiabetes(e.target.value)} labelId="demo-simple-select-label" label="Age" className="w-36" required>
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Total <br/> Cholestrol
                        </div>      
                        <div className="flex items-center">
                            <input type="number" value={totChol} onChange={(e) => setTotChol(e.target.value)} className="h-20 border-2 border-gray-200 w-36"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Sys <br/> BP
                        </div>      
                        <div className="flex items-center">
                            <input type="number" value={sysBP} onChange={(e) => setSysBP(e.target.value)} className="h-20 border-2 border-gray-200 w-36"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Dia <br/> BP
                        </div>      
                        <div className="flex items-center">
                            <input type="number" value={diaBP} onChange={(e) => setDiaBP(e.target.value)} className="h-20 border-2 border-gray-200 w-36"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Glucose
                        </div>      
                        <div className="flex items-center">
                            <input type="number" value={glucose} onChange={(e) => setGlucose(e.target.value)} className="h-20 border-2 border-gray-200 w-36"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            Heart <br/> Rate
                        </div>      
                        <div className="flex items-center">
                            <input type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} className="h-20 border-2 border-gray-200 w-36"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 Gender gap-36 text-center">
                        <div className="text-xl text-primary font-staat flex items-center justify-center">
                            BMI
                        </div>      
                        <div className="flex items-center">
                            <input type="number" value={BMI} onChange={(e) => setBMI(e.target.value)} className="h-20 border-2 border-gray-200 w-36"/>
                        </div>
                    </div>
                </div>

                <div>
                    {
                        ECGFile ? (
                            <div className="flex justify-center items-center">
                                <div className="h-96 flex justify-center items-center bg-black rounded-lg">
                                    <img src={preview} className="w-screen h-96"/>
                                </div>
                            </div>
                        ) : (
                            <div>
                            <div className="w-[90vw] h-96 flex justify-center items-center">
                             <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} required/>
                            </div>  
                            </div>
                        )
                    }

                </div>

                <div className="w-full flex justify-center">
                        <div className="">
                            <button className="rounded-lg px-3 py-2 bg-primary text-white font-staat hover:scale-125 hover:bg-white hover:text-primary transition-all">Submit</button>
                        </div>
                    </div>
            </form>
        </div>
    )
}