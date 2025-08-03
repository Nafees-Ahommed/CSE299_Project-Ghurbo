import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import TourPackages from './pages/TourPackages';
import PackageDetails from './pages/PackageDetails';
import MyBookings from './pages/MyBookings';
import PackageReg from './components/PackageReg';
import Layout from './pages/PackageOwner/Layout';
import Dashboard from './pages/PackageOwner/Dashboard';
import AddPackage from './pages/PackageOwner/AddPackage';
import ListPackage from './pages/PackageOwner/ListPackage';
import {Toaster} from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import Loader from './components/Loader';
import PaymentMethod from './pages/PaymentMethod';
import ChatBot from './components/ChatBot';
import Experience from './pages/Experience';
import About from './pages/About';


const App = () => {

  const isOwnerPath= useLocation().pathname.includes("owner");
  const {showPackageReg} = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showPackageReg && <PackageReg />}
      <div className='min-h-[70vh]'>

      <Routes>

        <Route path= '/' element ={<Home/>} />
        <Route path= '/packages' element ={<TourPackages/>} />
        <Route path= '/packages/:id' element ={<PackageDetails/>} />
        <Route path= '/my-bookings' element ={<MyBookings/>} />
        <Route path= '/payment/:bookingId' element ={<PaymentMethod/>} />
        <Route path= '/loader/:nextUrl' element ={<Loader/>}/>
        <Route path= '/owner' element={<Layout/>}>
           <Route index element={<Dashboard/>}/>
           <Route path="add-package" element={<AddPackage/>}/>
           <Route path="list-package" element={<ListPackage/>}/>
        </Route>  
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
      </Routes>

      </div>
      <Footer />
      <ChatBot/>
    </div>
  )
}

export default App
