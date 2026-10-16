import React from 'react'

function BusinessCard({ name, category, location, description }) {
  return (
    <div className='bg-white p-8 rounded-lg hover:shadow-md'>
        <div className='w-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl mb-4'>

        </div>
        <p className='text-sm text-green-500 font-semibold'>{category}</p>
        <h3 className='text-xl font-bold text-gray-800 mb-2'>{name}</h3>
        <p className='text-sm text-gray-600 mb-3'>{location}</p>
        <p className='text-gray-600 mb-5'>{description}</p>
        <button className='w-full border border-green-700 text-green-800 py-2 px-4 rounded-lg mt-4 hover:bg-green-600 hover:text-white'>View Services</button>
    </div>
  )
}

export default BusinessCard