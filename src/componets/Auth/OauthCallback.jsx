import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function OauthCallback() {
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search);
    const token =  params.get('token');
    
    useEffect(()=>{
        if(token){
            localStorage.setItem("token",token)
            localStorage.setItem("userName",params.get('userName'))
            localStorage.setItem("userId",params.get('userId'))
        }
        setTimeout(()=>{
            navigate("/dashboard")
        },2000)
    },[])

  return (
    <div className='h-screen w-full text-lg font-normal flex justify-center p-28'>please wait authenticating.....</div>
  )
}

export default OauthCallback