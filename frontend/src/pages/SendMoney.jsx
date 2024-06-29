import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import FriendName from "../components/FriendName";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";


export default function SendMoney(){

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const firstName = searchParams.get("name")
    const[amount,setAmount] = useState(0);
    const [isSuccess,setIsSuccess] = useState(false);

    

    return<>
        <div className="flex justify-center h-screen bg-gray-100">
            <div  className="h-full flex flex-col justify-center">
                <div className="border  h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="text-center">
                    <Heading label={"Send Money"}/>
                    </div>
                    <FriendName fname={firstName} />

                    
                

                    {isSuccess ? (<div>Successfull</div>):(
                        <div className="space-y-4 ">
                        <div className="space-y-2">
                            <label
                             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                             htmlFor="amount"> Amount (in Rs)</label>
    
                        <input onChange={e=>{
                            setAmount(e.target.value)
                        }}
                            type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" id="amount"
                            placeholder="Enter amount" />
                        </div>
                    </div>
                    )}

                    

                    <button onClick={()=>{
                        axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to : id,
                            amount
                        },{
                            headers : {
                                Authorization : "Bearer " + localStorage.getItem('token')
                            }
                        }).then(response=>{
                            setIsSuccess(true)
                        })
                        
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                    
                </div>
            </div>
        </div>
    </>
}