import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='h-screen bg-gradient-to-b from-zinc-900 to-red-700 flex items-center justify-center'>
      <div className="bg-zinc-800/80 rounded-lg px-8 py-10 w-full md:w-3/6 lg:w-1/3 border border-transparent">
        <p className='text-white text-2xl font-semibold text-center'>Sign Up</p>
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
            <label htmlFor="email" className='text-zinc-300 block text-sm font-medium'>
              Email
            </label>
            <input 
                type="email"
                id="email"
                className='w-full mt-2 bg-zinc-900/80 text-white p-3 rounded-md outline-none placeholder:text-zinc-400'
                placeholder='xyz@example.com'
                name="email"
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
          <div className='mt-4'>
            <label htmlFor="address" className='text-zinc-300 block text-sm font-medium'>
              Address
            </label>
            <textarea 
                id="address"
                className='w-full mt-2 bg-zinc-900/80 text-white p-3 rounded-md outline-none placeholder:text-zinc-400 resize-none overflow-y-auto h-auto'
                placeholder='address'
                name="address"
                required
                rows="1"
                onInput={(e) => e.target.style.height = `${e.target.scrollHeight}px`}
            />
          </div>
          <div className='mt-6'>
            <button className='w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-all duration-200 ease-in-out'>
              Sign Up
            </button>
          </div>
          <div className='mt-4 text-center'>
            <p className='text-zinc-300 text-sm'>
              Already have an account?{' '}
              <Link to="/login" className='text-red-500 font-semibold hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
