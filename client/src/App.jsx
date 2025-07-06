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


const App = () => {

 
  const isOwnerPath= useLocation().pathname.includes("owner");

  return (
    <div>

      {!isOwnerPath && <Navbar />}
      {false && <PackageReg />}
      <div className='min-h-[70vh]'>

      <Routes>

        <Route path= '/' element ={<Home/>} />
        <Route path= '/packages' element ={<TourPackages/>} />
        <Route path= '/packages/:id' element ={<PackageDetails/>} />
        <Route path= '/my-bookings' element ={<MyBookings/>} />
        <Route path= '/owner' element={<Layout/>}>
           <Route index element={<Dashboard/>}/>
           <Route path="add-package" element={<AddPackage/>}/>
           <Route path="list-package" element={<ListPackage/>}/>
        </Route>  
      </Routes>

      </div>
      <Footer />
    </div>
  )
}

export default App
