import React from 'react'

function Navbar() {
  return (
    <nav className='bg-green-800 text-white px-6 py-4'>
        <div className="mx-auto flex items-center justify-between">
        <h1 className= "text-2xl font-bold"> MtaaBiz</h1>
        <div className="flex items-center gap-4">
            <a href="#" className="hover:text-green-200">Home</a>
            <a href="#businesses" className="hover:text-green-200">Businesses</a>
            <a href="#" className='hover:text-green-200'>Login</a>
            <button className="bg-white text-green-800 py-2 px-4 rounded-lg font-semibold">Get Started</button>
        </div>
        </div>
    </nav>
  )
}

export default Navbar