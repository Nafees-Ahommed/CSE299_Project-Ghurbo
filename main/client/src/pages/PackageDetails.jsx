import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, tourCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';



const PackageDetails = ()=>{
    const {id} = useParams()
    const {tours, getToken, axios, navigate} = useAppContext();
    const [tour, setTour] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [ArrivalDate, setArrivalDate] = useState(null);
    const [DepartureDate, setDepartureDate] = useState(null);
    const [guests, setGuests] = useState(1);

    const [isAvaiable, setIsAvailable] = useState(false);

    const checkAvailability = async () => {
        try {
            if (ArrivalDate >= DepartureDate) {
            toast.error("Departure date must be less then arrival date");
            return;
            }
            const { data } = await axios.post('/api/bookings/check-availability', 
                {tour: id, ArrivalDate, DepartureDate } )
                if (data.success) {
                    if (data.isAvailable) {
                        setIsAvailable(true)
                        toast.success("Tour is available for booking")
                    }
                    else {
                        setIsAvailable(false)
                        toast.error("Tour is not available for booking")
                    }
                }else {
                    toast.error(data.message)
                }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            if (!isAvaiable) {
                return checkAvailability();
            }
            const { data } = await axios.post('/api/bookings/book', {tour: id, ArrivalDate, DepartureDate, guests, PaymentMethod: "Pay At Package"}, {headers: { Authorization: `Bearer ${await getToken()}` }})
            if (data.success) {
                toast.success(data.message)
                navigate(`/my-bookings`)
                scrollTo(0, 0)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        const tour = tours.find(tour => tour._id === id)
        tour && setTour(tour)
        tour && setMainImage(tour.images[0])
    },[tours])
  return tour && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>

        {/* Tour Details */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>
                {tour.existingPackage.name} <span className='font-inter text-sm'>{tour.tourType}
                </span></h1>
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500
            rounded-full'>15% OFF</p>
        </div>

        {/* Tour Rating*/}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className='ml-2'>300+ reviews</p>
        </div>

        {/* Tour Address */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <img src={assets.locationIcon} alt="Location-icon" />
            <span>{tour.existingPackage.address}</span>
        </div>

        {/*Tour Images */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
            <div className='lg:w-1/2 w-full'>
                <img src={mainImage} alt="Tour Image" 
                className='w-full rounded-xl shadow-lg object-cover'/>
            </div>
            <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                {tour?.images.length > 1 && tour.images.map((image, index)=>(
                    <img onClick={()=> setMainImage(image)} 
                    key={index} src={image} alt="Tour Image" 
                    className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}/>
                ))}
            </div>
        </div>

        {/*Tour Highlights */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>Discover The Bangladesh In Comfort</h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                    {tour.amenities.map((item, index)=>(
                        <div key={index} className='flex items-center gap-2 px-3 py-2
                        rounded-lg bg-gray-100'>
                            <img src={facilityIcons[item]} alt={item} className='w-5
                            h-5' />
                            <p className='text-xs'>{item}</p>

                        </div>
                    ))}
                </div> 
            </div>

            {/*Tour Price */}
            <p className='text-2xl font-medium'>৳{tour.pricePerNight}/Per Person </p>

        </div>

        {/*Arrival Departure Form */}
<form 
  onSubmit={onSubmitHandler} 
  className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-xl mx-auto mt-16 max-w-6xl border-2 border-orange-500 shadow-[0px_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0px_15px_45px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 ease-in-out focus-within:border-green-500 focus-within:shadow-[0px_0px_0px_4px_rgba(59,130,246,0.1)]'
>
  <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
    <div className='flex flex-col'>
      <label htmlFor="ArrivalDate" className='font-medium'>Arrival Date</label>
      <input 
        onChange={(e)=>setArrivalDate(e.target.value)} 
        min={new Date().toISOString().split('T')[0]} 
        type="date" 
        id='ArrivalDate' 
        placeholder='Arrival' 
        className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200' 
        required
      />
    </div>

    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
    
    <div className='flex flex-col'>
      <label htmlFor="DepartureDate" className='font-medium'>Departure Date</label>
      <input 
        onChange={(e)=>setDepartureDate(e.target.value)} 
        min={ArrivalDate} 
        disabled={!ArrivalDate} 
        type="date" 
        id='DepartureDate' 
        placeholder='Departure' 
        className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed' 
        required
      />
    </div>

    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
    
    <div className='flex flex-col'>
      <label htmlFor="guests" className='font-medium'>Guests</label>
      <input 
        onChange={(e)=>setGuests(e.target.value)} 
        value={guests} 
        type="number" 
        id='guests' 
        placeholder='1' 
        className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200'
        required
      />
    </div>
  </div>

  <button 
  type='submit' 
  className={`${
    isAvaiable 
      ? 'bg-green-600 hover:bg-green-700' 
      : 'bg-orange-500 hover:bg-orange-700'
  } active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer shadow-lg hover:shadow-xl`}
>
  {isAvaiable ? "Book Now " : "Check Availability"} 
</button>
</form>

        {/*Common Specification */}
        <div className='mt-25 space-y-4'>
            {tourCommonData.map(( spec, index)=>(
                <div key={index} className='flex items-start gap-2'>
                    <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6'/>
                    <div>
                        <p className='text-base'>{spec.title}</p>
                        <p className='text-gray-500'>{spec.description}</p>
                    </div>

                </div>
            ))}
        </div>

        <div className='max-w-3xl border-gray-300 my-15 py-10 text-gray-500'>
            <p>Guests will be placed in tour groups based on availability and preference. Each package is designed to give you a complete and immersive travel experience. The listed price is for two travelers — to get accurate pricing for larger groups, please select the exact number of people while booking.</p>
        </div>

        {/*Hosted by */}
        <div className='flex flex-col items-start gap-4'>
            <div className='flex gap-4'>
                <img src={tour.existingPackage.owner.image} alt="Host" className='h-14 w-14
                md:w-18 rounded-full' />
                <div>
                    <p className='text-lg md:text-xl'>Hosted by {tour.existingPackage.name}</p>
                    <div className='flex items-center mt-1'>
                        <StarRating />
                        <p className='ml-2'>300+ reviews</p>
                    </div>
                </div>
            </div>
            <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary
            hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>

        </div>
        
    </div>
  )
}

export default PackageDetails