import { useState } from "react";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const[firstName,setFirstname] = useState("");
    const[lastName,setLastname] = useState("");
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    return(<>
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign Up"}/>
            <SubHeading label={"Enter your information to create account"}/>

            <InputBox onChange={e=>{
                setFirstname(e.target.value)
                }} label={"First Name"} placeholder={"John"}/>


            <InputBox onChange={e=>{
                setLastname(e.target.value)
            }} label={"Last Name"} placeholder={"Doe"}/>

            <InputBox onChange={e=>{
                setUsername(e.target.value)
            }} label={"Email"} placeholder={"Example@gmai.com"}/>


            <InputBox onChange={e=>{
                setPassword(e.target.value)
            }} label={"Password"} placeholder={"123456"}/>


            <Button onClick={ async()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password,
                });
            localStorage.setItem('token', response.data.token)
                navigate('/dashboard');
            }} label={"Sign UP"}/>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
        </div>
        </div>
    </div>
    </>
    )
}