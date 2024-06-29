import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

export default function Dashboard(){
    const[balance,setbalance] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization : "Bearer " + localStorage.getItem('token'),
            }
        }).then(response =>{
            setbalance(response.data.balance);
        })
    },[balance])


    return<>
        <div className=" bg-slate-300 h-screen flex justify-center">
            <div className=" flex flex-col justify-center w-1/2">
            <div className="rounded-lg bg-white  text-center p-2 h-max px-4 overflow-auto">
            <AppBar/>
            <Balance value={balance}/>
            <Users/>
             </div>
            </div>
        </div>
    </>
}