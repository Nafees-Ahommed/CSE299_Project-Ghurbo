import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddPackage = () => {

  const {axios, getToken} = useAppContext()

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })

  const [inputs, setInputs] = useState({
    tourType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Tour Guide': false,
      'Mountain View': false,
      'Pool Access': false
    }
  })

  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!inputs.tourType || !inputs.pricePerNight || !Object.values(images).some(image => image)) {
      toast.error('Please fill all fields and upload images')
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData()
      formData.append('tourType', inputs.tourType)
      formData.append('pricePerNight', inputs.pricePerNight)
      const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key])
      formData.append('amenities', JSON.stringify(amenities))

      Object.keys(images).forEach((key) => {
        images[key] && formData.append(`images`, images[key])
      })
      const {data} = await axios.post('/api/tours/', formData, {headers: {Authorization: `Bearer ${await getToken()}`}})
      if (data.success) {
        toast.success(data.message)
        setInputs({
          tourType: '',
          pricePerNight: 0,
          amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Tour Guide': false,
            'Mountain View': false,
            'Pool Access': false
          }
        })
        setImages({
          1: null,
          2: null,
          3: null,
          4: null
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler}> 
      <Title align='left' font='outfit' title='Add Package' subTitle='Carefully provide detailed information about the tour package, including destination, duration, pricing, and amenities, to ensure a seamless and informed booking experience.' />
       
      {/* Upload Area For Images */} 
      <p className='text-gray-800 mt-10'>Images</p> 
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`tourImage${key}`} key={key}>
            <img className='max-h-13 cursor-pointer opacity-80'
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
            <input type='file' accept='image/*' id={`tourImage${key}`} hidden
              onChange={(e) => setImages({...images, [key]: e.target.files[0]})} /> 
          </label>
        ))}
      </div>

      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Package Type:</p> 
          <select value={inputs.tourType} onChange={e => setInputs({...inputs, tourType: e.target.value})} 
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
            <option value="">Select Package Type</option> 
            <option value="Solo Traveler">Solo Traveler</option> 
            <option value="Couple's Getaway">Couple's Getaway</option> 
            <option value="Family Fun">Family Fun</option>
            <option value="Friends Trip">Friends Trip</option> 
          </select> 
        </div> 

        <div>
          <p className='mt-4 text-gray-800'>
            Price <span className='text-xs'>/Per Person</span>
          </p>
          <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' 
            value={inputs.pricePerNight} onChange={e => setInputs({...inputs, pricePerNight: e.target.value})} />
        </div>
      </div>

      <p className="text-gray-800 mt-4">Amenities</p>
      <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index} className='flex items-center gap-2 mb-2'>
            <input type="checkbox" id={`amenities${index + 1}`} 
              checked={inputs.amenities[amenity]} 
              onChange={() => setInputs({...inputs, amenities: {...inputs.amenities, [amenity]: !inputs.amenities[amenity]}})} />
            <label htmlFor={`amenities${index + 1}`}>{amenity}</label> 
          </div> 
        ))} 
      </div> 

      <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer' disabled={loading}> 
        {loading ? 'Adding...' : "Add Package"} 
      </button>
    </form>
  )
}

export default AddPackage