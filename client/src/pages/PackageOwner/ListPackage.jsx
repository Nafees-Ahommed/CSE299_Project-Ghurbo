import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const ListPackage = () => {


   const [tours,setTours] = useState([])
   const{axios, getToken, user,currency}=useAppContext()
  const fetchTours = async () => {
    try {
      const {data} = await axios.get('/api/tours/owner', {headers: {Authorization: `Bearer ${await getToken()}`}})
      if (data.success) {
        setTours(data.tours)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Function to toggle availability of a tour
  const toggleAvailability = async (tourId) => {
    try {
      const {data} = await axios.post('/api/tours/toggle-availability', {tourId}, 
      {headers: {Authorization: `Bearer ${await getToken()}`}})
      if (data.success) {
        toast.success(data.message);
        fetchTours();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchTours();
      }
    },[user]);

  return (
    <div>

      <Title align='left' font='outfit' title='Package Listings' subtitle='View, edit,
       or manage all listed packages. Keep the information up-to-date to provide the
        best experience for users.' />
       <p className='text-gray-500 mt-8'>All Tour Packages</p>

       <div className='w-full max-w-3xl text-left border border-gray-300
        rounded-lg max-g-80 overflow-y-scroll mt-3'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                   <tr>
                    <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                    <th className='py-3 px-4 text-gray-800 font-medium
                    max-sm:hidden'>Facility</th>
                    <th className='py-3 px-4 text-gray-800 font-medium
                    '>Price PerPerson</th>
                    <th className='py-3 px-4 text-gray-800 font-medium 
                    text-center'>Actions</th>
                   </tr>
                </thead>
                <tbody className='text-sm'>
                   {
                   tours.map((item, index)=>(
                     <tr key={index}>
                       <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                         {item.tourType}
                          </td>
                           <td className='py-3 px-4 text-gray-700 border-t border-gray-300
                            max-sm:hidden'> 
                            {item.amenities.join(', ')} 
                            </td> 
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'> 
                            {currency} {item.pricePerNight} 
                            </td>
                            <td className='py-3 px-4 border-t border-gray-300 text-sm text-red-500
                            text-center'> 
                             <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                              <input
                                onChange={() => toggleAvailability(item._id)}
                                type="checkbox"
                                className="sr-only peer"
                                checked={item.isAvailable}
                              />
                              <div className={`w-12 h-7 rounded-full transition-colors duration-200 ${item.isAvailable ? 'bg-blue-600' : 'bg-red-600'}`}></div>
                                <span className={`dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${item.isAvailable ? 'translate-x-5' : ''}`}></span>
                              </label>

                            </td>
                            </tr> 
                          ) )
                        }
                          
                          </tbody> 



            </table>

        </div>
        
    </div>
  )
}

export default ListPackage