import React from 'react'
import { useNavigate } from 'react-router-dom';
export const LoginButton = () => {
    const navigate = useNavigate();

      const handleGoLogin = () => {
        navigate('/login');
      };
    
  return (
    <div className='flex justify-around gap-1'> 
        <button onClick={handleGoLogin} className='text-lg text-slate-400 font-bold pr-5'>Login</button>
    </div>
  )
}
