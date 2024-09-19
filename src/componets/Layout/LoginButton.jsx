import React from 'react'
import { useNavigate } from 'react-router-dom';
export const LoginButton = () => {
    const navigate = useNavigate();
      const handleGoLogin = () => {
        navigate('/login');
      };
    
      const handleGoRegister = () => {
        navigate('/register');
      };

  return (
    <div className='flex justify-around gap-1'> 
        <button onClick={handleGoLogin} className='bg-blue-300'>login</button>
        <button onClick={handleGoRegister} className='bg-blue-300'>Register</button>
    </div>
  )
}
