import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { assets, facilityIcons } from '../assets/assets';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';

const CheckBox = ({label, selected = false, onChange = ()=> { } }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input type="checkbox" checked={selected} onChange={(e)=>onChange(e.target.checked, label)}/>
    <span className='font-light select-none'>{label}</span>
  </label>
);

const RadioButton = ({label, selected = false, onChange = () => {}}) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input type="radio" name="sortOption" checked={selected} onChange={() =>onChange(label)}/>
    <span className='font-light select-none'>{label}</span>
  </label>
);

const packageTypes = [
  "Solo Traveler",
  "Couple's Getaway",
  "Family Fun",
  "Friends Trip",
];

const priceRanges = [
  '500 to 5000',
  '5000 to 10000',
  '10000 to 20000',
  '20000 to 50000',
];

const sortOptions = [
  "Price Low to High",
  "Price High to Low",
  "Newest First"
];

const TourPackages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tours = [], navigate, currency } = useAppContext();

  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    tourType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState('');

  // Sync filters with URL query params from chatbot
  useEffect(() => {
    const urlBudget = searchParams.get('budget'); // e.g. 5000-10000
    const urlTourType = searchParams.get('tourType'); // e.g. Solo Traveler
    let newFilters = { tourType: [], priceRange: [] };

    if (urlBudget) {
      // Convert dash format to ' to '
      const displayBudget = urlBudget.replace('-', ' to ');
      if (priceRanges.includes(displayBudget)) {
        newFilters.priceRange.push(displayBudget);
      }
    }
    if (urlTourType) {
      // Match the tour type (ensure it's in the list)
      if (packageTypes.includes(urlTourType)) {
        newFilters.tourType.push(urlTourType);
      }
    }
    setSelectedFilters(newFilters);
    // eslint-disable-next-line
  }, [searchParams]);

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type] = [...updatedFilters[type], value];
      } else {
        updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
      }
      return updatedFilters;
    });
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  const matchesTourType = (tour) => {
    return selectedFilters.tourType.length === 0 || selectedFilters.tourType.includes(tour.tourType);
  };

  const matchesPriceRange = (tour) => {
    return selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some(range => {
      const [min, max] = range.split(' to ').map(Number);
      return tour.pricePerNight >= min && tour.pricePerNight <= max;
    });
  };

  const sortTours = (a, b) => {
    if (selectedSort === "Price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  const filterDestinations = (tour) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return tour.existingPackage && tour.existingPackage.city &&
      tour.existingPackage.city.toLowerCase().includes(destination.toLowerCase());
  };

  const filteredTours = useMemo(() => {
    return tours
      .filter(tour => matchesTourType(tour) && matchesPriceRange(tour) && filterDestinations(tour))
      .sort(sortTours);
  }, [tours, selectedFilters, selectedSort, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({
      tourType: [],
      priceRange: [],
    });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between gap-8 pt-28 px-4 lg:px-24 xl:px-32'>
      <div>
        <div className='flex flex-col items-start text-left'>
          <h1 className='font-playfair text-4xl md:text-[40px]'> Tour Packages </h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
            Explore our carefully curated tour packages designed to suit every traveler — from adventurous getaways to relaxing retreats, all crafted to deliver unforgettable experiences.
          </p>
        </div>
        <div>
          {filteredTours.map((tour) => (
            <div key={tour._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
              <img
                onClick={() => { navigate(`/packages/${tour._id}`); window.scrollTo(0, 0); }}
                src={tour.images?.[0]}
                alt="package-img"
                title='View Tour Details'
                className='max-h-65 md:w-1/2 rounded-x1 shadow-1g object-cover cursor-pointer'
              />
              <div className='md:w-1/2 flex flex-col gap-2'>
                <p className='text-gray-500'>{tour.existingPackage?.city}</p>
                <p
                  onClick={() => { navigate(`/packages/${tour._id}`); window.scrollTo(0, 0); }}
                  className='text-gray-800 text-3xl font-playfair cursor-pointer'
                >
                  {tour.existingPackage?.name}
                </p>
                <div
                  onClick={() => { navigate(`/packages/${tour._id}`); window.scrollTo(0, 0); }}
                  className='flex items-center'
                >
                  <StarRating />
                  <p className='ml-2'> 300+ reviews</p>
                </div>
                <div className='flex items-center gap-1 text-gray-500 mt-2'>
                  <img src={assets.locationIcon} alt='location-icon'/>
                  <span>{tour.existingPackage?.address}</span>
                </div>
                <div>
                  {/*Package Amenities*/ }
                  <div className='flex items-wrap items-center mt-3 mb-6 gap-4'>
                    {tour.amenities?.map((item, index) => (
                      <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                        <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                        <p className='text-xs'>{item}</p>
                      </div>
                    ))}
                  </div>
                  {/* Package Price Per Person*/}
                  <p className='text-xl font-medium text-gray-700'>৳ {tour.pricePerNight}/Per Person</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Filters */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">

        <div className={`flex items-center justify-between px-5 py-2.5  min-lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='text-xs cursor-pointer'>
            <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
              {openFilters ?'HIDE':'SHOW' }
            </span>
            <span onClick={clearFilters} className='hidden lg:block'>CLEAR</span>
          </div>
        </div>
        <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
            {packageTypes.map((tour, index) => (
              <CheckBox key={index} label={tour} selected={selectedFilters.tourType.includes(tour)} onChange={(checked) => handleFilterChange(checked, tour, 'tourType')}/>
            ))}
          </div>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox key={index} label={`${currency}  ${range}`} selected={selectedFilters.priceRange.includes(range)} onChange={(checked) => handleFilterChange(checked, range, 'priceRange')}/>
            ))}
          </div>
          <div className='px-5 pt-5 pb-8'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} selected={selectedSort === option} onChange={() => handleSortChange(option)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackages;
