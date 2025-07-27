import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyBookings = () => {

  const {axios, getToken, user} = useAppContext()
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user', {headers: { Authorization: `Bearer ${await getToken()}` }})
      if(data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handlePayment = (bookingId) => {
    // Navigate to payment method page with booking ID
    navigate(`/payment/${bookingId}`)
  }

  useEffect(()=>{
    if (user){
      fetchUserBookings()
    }
  },[user, axios, getToken] ) // Added missing dependencies

  return (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-orange-50 to-white min-h-screen'>
        <Title title='My Bookings' subtitle=" All Your Trips, In One Place: Manage Memories, Plan Your Next Move. " align='left' />
        <div className='max-w-6xl mx-8 w-full text-gray-800'>
           <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b-2 border-orange-200 font-semibold text-base py-4 bg-orange-100 rounded-t-lg px-6'>
               <div className="w-1/3 text-orange-800"> Packages </div>
               <div className="w-1/3 text-orange-800"> Date & Timings </div>
               <div className="w-1/3 text-orange-800"> Payment </div>
           </div>
           {bookings.map((booking, index) => (
            <div key={booking._id} className={`grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-orange-100 py-6 px-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ${index === 0 ? 'rounded-t-none' : ''} ${index === bookings.length - 1 ? 'rounded-b-lg' : ''}`}> 
              {/*------ Package Details ------*/}
                <div className='flex flex-col md:flex-row'>
                  <img 
                    src={booking.tour?.images?.[0] || '/placeholder-image.jpg'} 
                    alt="package-img" 
                    className='w-44 md:w-44 rounded shadow object-cover' // Fixed: changed min-md:w-44 to w-44 md:w-44
                  /> 
                  <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'> {/* Fixed: changed min-md:ml-4 to md:ml-4 */}
                        <p className='font-playfair text-2xl text-gray-800'> 
                          {booking.existingPackage?.name || 'Package Name Not Available'}
                          <span className='font-inter text-sm text-orange-600 ml-2'> ({booking.tour?.tourType || 'N/A'})</span>
                        </p>
                    <div className='flex items-center gap-1 text-sm text-gray-600'> 
                        <img src={assets.locationIcon} alt="location-icon" />
                        <span>{booking.existingPackage?.address || 'Address not available'}</span>
                    </div>
                    <div className='flex items-center gap-1 text-sm text-gray-600'> 
                        <img src={assets.guestsIcon} alt="guest-icon" />
                        <span>Guests: {booking.guests || 0}</span>
                    </div>
                    <p className='text-base font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-full inline-block'> Total: ৳ {booking.totalPrice || 0} /Taka </p>
                  </div>
                </div>
              {/*------ Date & Timings ------*/}
              <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                <div className='bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400'>
                    <p className='font-semibold text-orange-800'>From:</p>
                    <p className='text-gray-600 text-sm'>
                    {booking.ArrivalDate ? new Date(booking.ArrivalDate).toDateString() : 'Date not available'}
                    </p>
                </div>
                <div className='bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400'>
                    <p className='font-semibold text-orange-800'>To:</p>
                    <p className='text-gray-600 text-sm'>
                    {booking.DepartureDate ? new Date(booking.DepartureDate).toDateString() : 'Date not available'}
                    </p>
                </div>
              </div>
              {/*------ Payment Status ------*/}
              <div className='flex flex-col items-start justify-center pt-3'>
                    <div className='flex items-center gap-2 mb-3'>
                      <div className={`h-4 w-4 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"} shadow-md`}></div>
                      <p className={`text-sm font-semibold ${booking.isPaid ? "text-green-600" : "text-red-600"}`}>
                      {booking.isPaid ? "Paid" : "Unpaid"}
                      </p>
                    </div>
                    {!booking.isPaid && (
                      <button onClick={() => handlePayment(booking._id)} className='px-6 py-2 bg-orange-500 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
                        Pay Now
                      </button>
                    )}
                    {booking.isPaid && (
                      <div className='px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200'>
                        ✓ Payment Complete
                      </div>
                    )}
              </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default MyBookings