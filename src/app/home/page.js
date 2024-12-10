'use client';
import Navbar from "@/components/Navbar"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { useRouter } from "next/navigation";
export default function Home(){
   
    const [username, setUsername] = useState("");
    const router = useRouter();
    
    useEffect(() => {
        const getUser = () => {
            let user = localStorage.getItem("email");
            if (user) {
            user = user.slice(0, username.length-10);
            setUsername(user);
            }
        }

        const putChart = () => {
            var heartRateContext = document.getElementById("heartrate");
            if(heartRateContext){
                var HeartRate = new Chart(heartRateContext.getContext('2d'), {
                    type: 'line', // Type of chart
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // X-axis labels
                        datasets: [{
                            label: 'heartrate', // Label for the dataset
                            data: [73, 69, 75, 75, 78, 77, 77, 78, 78, 70, 73, 70], // Data points for the line
                            fill: false, // Don't fill under the line
                            borderColor: '#29783e', // Line color
                            tension: 0.1 // Smoothness of the line
                        }]
                    },
                    // options: {
                    //     scales: {
                    //         y: {
                    //             beginAtZero: true // Y-axis starts from zero
                    //         }
                    //     }
                    // }
                });
            }
            

            var cholestrolContext = document.getElementById("cholestrol");
            if(cholestrolContext){
                var cholestrol = new Chart(cholestrolContext.getContext('2d'), {
                    type: 'line', // Type of chart
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // X-axis labels
                        datasets: [{
                            label: 'cholesterol', // Label for the dataset
                            data: [201, 186, 179, 201, 159, 189, 182, 165, 191, 188, 184, 178], // Data points for the line
                            fill: false, // Don't fill under the line
                            borderColor: '#29783e', // Line color
                            tension: 0.1 // Smoothness of the line
                        }]
                    },
                    // options: {
                    //     scales: {
                    //         y: {
                    //             beginAtZero: true // Y-axis starts from zero
                    //         }
                    //     }
                    // }
                });
            }
            

            var diabetesContext = document.getElementById("diabetes");
            if(diabetesContext){
                var diabetes = new Chart(diabetesContext.getContext('2d'), {
                    type: 'line', // Type of chart
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // X-axis labels
                        datasets: [{
                            label: 'diabetes', // Label for the dataset
                            data: [113, 110, 110, 115, 111, 112, 108, 119, 117, 113, 110, 128], // Data points for the line
                            fill: false, // Don't fill under the line
                            borderColor: '#29783e', // Line color
                            tension: 0.1 // Smoothness of the line
                        }]
                    },
                    // options: {
                    //     scales: {
                    //         y: {
                    //             beginAtZero: true // Y-axis starts from zero
                    //         }
                    //     }
                    // }
                });
            }
            
        }

        return () => {
            getUser();
            putChart();
        }
    }, [])

    

    
    return (
        <div>
            <Navbar />
            <div className="pt-24 font-staat flex flex-col gap-28">
                <div className="text-6xl text-primary p-5">
                    Welcome {username}!
                </div>
                <div className="flex justify-center gap-36 px-7">
                    <div className=" px-10 rounded-lg shadow-lg">
                        <div className="flex justify-center items-center text-7xl p-8 text-primary">
                            Heart Rate
                        </div>
                        <div className="flex justify-center items-center text-3xl p-8 text-primary text-center">

                            Measure Your Heart Rate and Monitor your health with HeartSense
                        </div>
                    </div>
                    <div style={{width: "800px"}}>
                        <canvas id="heartrate"></canvas>
                    </div>
                </div>
                <div className="flex justify-center gap-36">
                    <div className="flex flex-col">
                        <div className="text-center font-staat text-primary text-5xl">
                            Cholestrol
                        </div>
                        <div style={{width: "400px"}}>
                            <canvas id="cholestrol"></canvas>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="text-center font-staat text-primary text-5xl">
                            Diabetes
                        </div>
                        <div style={{width: "400px"}}>
                            <canvas id="diabetes"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}