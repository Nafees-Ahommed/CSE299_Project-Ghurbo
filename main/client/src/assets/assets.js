import logo from './Ghurbo_Logo_White.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import tourGuideIcon from './tourGuideIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import packageImg1 from './packageImg1.png'
import packageImg2 from './packageImg2.png'
import packageImg3 from './packageImg3.png'
import packageImg4 from './packageImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
import bKash from './bKash.svg'
import Nagad from './Nagad.svg'
import Bank from './Bank.svg'
import Card from './Card.svg'

export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    tourGuideIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
    bKash,
    Nagad,
    Bank,
    Card,
}

export const cities = [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Mymensingh",
    "Rangpur",
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Tea Valley Retreat", description: "Book 10 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
    { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "I've used many travel platforms before, but none compare to the personalized service and attention to detail this platform offers." },
    { id: 2, name: "Liam Johnson", address: "New York, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "Exceeded my expectations. The booking process was seamless, and the tour packages were exceptional. Highly recommended!" },
    { id: 3, name: "Sophia Lee", address: "Seoul, South Korea", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Fantastic experience with Ghurbo! I always find the best travel deals and authentic experiences here. Never disappointed!" }
];

// Facility Icon
export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Tour Guide": assets.tourGuideIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Rokib Hasan",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yekE3MU9oZ3djU3FtUTVkT05kZk5FR2Y1SHgifQ?width=96",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "Dhaka"
    ]
}

// Package Dummy Data - renamed from hotelDummyData to packageDummyData
export const packageDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Best Tour Packages",
    "address": "Sugandha Point, Cox's Bazar, Bangladesh",
    "contact": "+8801712345678",
    "owner": userDummyData,
    "city": "Cox's Bazar",
    "createdAt": "2025-06-01T08:30:00.000Z",
    "updatedAt": "2025-06-20T12:00:00.000Z",
    "__v": 0
}

// Tours Dummy Data - renamed from roomsDummyData to toursDummyData
export const toursDummyData = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "existingPackage": packageDummyData,
        "tourType": "Solo Traveler",
        "pricePerNight": 5000,
        "amenities": ["Free WiFi", "Free Breakfast", "Pool Access"],
        "images": [packageImg1, packageImg2, packageImg3, packageImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "existingPackage": packageDummyData,
        "tourType": "Couple's Getaway",
        "pricePerNight": 3599,
        "amenities": ["Free WiFi", "Free Breakfast", "Pool Access"],
        "images": [packageImg2, packageImg3, packageImg4, packageImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "existingPackage": packageDummyData,
        "tourType": "Family Fun",
        "pricePerNight": 2549,
        "amenities": ["Free WiFi", "Free Breakfast", "Mountain View"],
        "images": [packageImg3, packageImg4, packageImg1, packageImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "existingPackage": packageDummyData,
        "tourType": "Friends Trip",
        "pricePerNight": 2999,
        "amenities": ["Free WiFi", "Free Breakfast", "Mountain View"],
        "images": [packageImg4, packageImg1, packageImg2, packageImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    }
]

// For Tour Details Page - renamed from roomCommonData to tourCommonData
export const tourCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Travel", description: "All our tours follow strict hygiene and safety protocols for your peace of mind." },
    { icon: assets.badgeIcon, title: "Trusted Service", description: "Curated by Ghurbo with verified partners and expert travel planners." },
    { icon: assets.locationFilledIcon, title: "Top Destinations", description: "Most of our travelers rated the location 5 stars — close to top attractions and essentials." },
    { icon: assets.heartIcon, title: "Seamless Booking", description: "Fast, easy, and reliable booking with Ghurbo's dedicated support." },
];

// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "tour": toursDummyData[1],
        "existingPackage": packageDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 12999,
        "guests": 2,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "tour": toursDummyData[0],
        "existingPackage": packageDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 4500,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Package",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "tour": toursDummyData[3],
        "existingPackage": packageDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 16000,
        "guests": 4,
        "status": "pending",
        "paymentMethod": "Pay At Package",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 956,
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/