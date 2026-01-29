import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";


const Navbar = () => {
  const [user, setUser] = useState([])
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session.user.email)
    }
    getSession()
  }, [])
  
  return (
    <div className="w-full sticky top-0 z-50 flex justify-between items-center p-3 h-18 bg-blue-800">
      <h1 className="text-white text-md font-semibold">Dashboard Perpus Smkansa</h1>
      <span className="text-white">Welcome, {user}</span>
    </div>
  )
}


export default Navbar;