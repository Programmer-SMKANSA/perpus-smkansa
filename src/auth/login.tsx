import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { supabase } from "../lib/supabase-client";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password
    })
    if (data) {
      navigate("/dashboard")
    } else {
      alert("kata sandi salah!")
    }
  }
  
  return (
    
    
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-zinc-800 rounded-2xl w-120 gap-4 h-95 flex p-5 items-center flex-col">
      <img className="h-fit w-20" src="https://smkn1sumbawa.sch.id/wp-content/uploads/2022/08/Logo-SMKN-1.png"/>
        <h1 className="text-white text-2xl">Login to Dashboard</h1>
        <div className="flex gap-2 border border-zinc-500 w-90 rounded-md p-3 items-center">
          <FaUser className="text-white"/><input onChange={(e) => {setUsername(e.target.value)}} value={username} type="email" className="text-white outline-0" placeholder="Your Username"/>
        </div>
        <div className="flex gap-2 border border-zinc-500 w-90 rounded-md p-3 items-center">
          <RiLockPasswordLine className="text-white"/><input onChange={(e) => {setPassword(e.target.value)}} value={password} type="password" className="text-white outline-0" placeholder="Your Password"/>
        </div>
        <div className="flex gap-2 bg-blue-500 cursor-pointer justify-center text-white w-90 rounded-md p-3 items-center">
        <button className="cursor-pointer" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login;