import React, { useState } from 'react' 
import PackageCard from './PackageCard'
import Title from './Title' 
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';


const RecommendedPackages = () => {
    
    const { tours, searchedCities } = useAppContext();
     const [recommended, setRecommended] = useState([]);
     
     const filterPackages = () => { 
        
        const filteredPackages = tours.slice().filter(tour => searchedCities.includes(tour.existingPackage.city)); 
        setRecommended(filteredPackages);
        } 


        useEffect(() => {
            
            filterPackages() 
        
        }, [tours, searchedCities]) 
        
        return recommended.length > 0 && ( 
        
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'> 
         
         <Title title='Recommended Packages' subtitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.'/>
          
           <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {recommended.slice(0,4).map((tour, index) => (<PackageCard key={tour._id} tour={tour} index={index}/> 
                ))}
                
                 </div> 
                 
                 </div> 
                 )
                }

export default RecommendedPackages
    
        