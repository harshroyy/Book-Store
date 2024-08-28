import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='h-screen bg-gradient-to-b from-zinc-900 to-red-700 flex items-center justify-center'>
      <div className="bg-zinc-800/80 rounded-lg px-8 py-10 w-full md:w-3/6 lg:w-1/3 border border-transparent">
        <p className='text-white text-2xl font-semibold text-center'>Login</p>
        <div className='mt-8'>
          <div className='mt-4'>
            <label htmlFor="username" className='text-zinc-300 block text-sm font-medium'>
              Username
            </label>
            <input 
                type="text"
                id="username"
                className='w-full mt-2 bg-zinc-900/80 text-white p-3 rounded-md outline-none placeholder:text-zinc-400'
                placeholder='username'
                name="username"
                required
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="password" className='text-zinc-300 block text-sm font-medium'>
              Password
            </label>
            <input 
                type="password"
                id="password"
                className='w-full mt-2 bg-zinc-900/80 text-white p-3 rounded-md outline-none placeholder:text-zinc-400'
                placeholder='password'
                name="password"
                required
            />
          </div>
          <div className='flex justify-between items-center mt-4'>
            <label className='text-zinc-300 text-sm flex items-center'>
              <input type="checkbox" className='mr-2 accent-red-600'/>
              Remember me
            </label>
            <Link to="/forgot-password" className='text-zinc-400 text-sm hover:underline'>
              Forget Password?
            </Link>
          </div>
          <div className='mt-6'>
            <button className='w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-all duration-200 ease-in-out'>
              Login
            </button>
          </div>
          <div className='mt-4 text-center'>
            <p className='text-zinc-300 text-sm'>
              Don't have an account?{' '}
              <Link to="/SignUp" className='text-red-500 font-semibold hover:underline'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
