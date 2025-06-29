import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const PackageCard = ({ room, index }) => {
  return (
    <Link to={'/rooms/' + room._id} onClick={() => scrollTo(0,0)} key={room._id}
    className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0px_8px_8px_rgba(0,0,0,0.05)]'
    >
        <img src={room.images[0]} alt="" />
        {index % 2 === 0 && <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>Best Seller</p>}
        <div className='p-4'>
            <p className='font-playfair text-lg font-medium text-gray-800'>
               {room.hotel.name}
            </p>
            <div className='flex items-center text-sm text-gray-500 gap-1 mt-1'>
               <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
               <span>{room.hotel.address}</span>
            </div>
            <div className='flex items-center gap-1 mt-2'>
                <img src={assets.starIconFilled} alt="star-icon" className="w-4 h-4" />
                <span>4</span>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <p>
                    <span className='text-xl font-semibold text-gray-800'>৳{room.pricePerNight}</span>
                    <span className='text-sm text-gray-500'>/Per Person</span>
                </p>
            <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>Book Now</button>
            </div>
        </div>

    </Link>
  )
}

export default PackageCard