import React from 'react'
import PackageCard from './PackageCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {
  const { tours,navigate } = useAppContext()
  
  return tours.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 py-20'>
      <Title 
        title='Featured Destination' 
        subtitle='Plan your perfect trip with Ghurbo - discover top destinations, budget-friendly stays, and personalized tour packages designed just for you.' 
      />

      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {tours.slice(0, 4).map((tour, index) => (
          <PackageCard key={tour._id} tour={tour} index={index}/>
        ))}
      </div>
      
      <button 
        onClick={() => {
          navigate('/packages');
          window.scrollTo(0, 0);
        }} 
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
        View All Destinations
      </button>
    </div>
  )
}

export default FeaturedDestination