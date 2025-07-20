//Function to check Availability of Tour

import Booking from "../models/Booking.js";
import Package from "../models/Package.js";
import Tour from "../models/Tour.js";



const checkAvailability = async ({ checkInDate, checkOutDate, tour })=>{


try{

  const bookings= await Booking.find({

       tour,
       checkInDate: { $lte: checkOutDate },
       checkOutDate: { $gte: checkInDate },

  });
  
  const isAvailable = bookings.length === 0;
  return isAvailable;



}catch (error){

    console.error(error.message);


}


}

 // API to check availability of tour
 //POST /api/bookings/check-availability

 export const checkAvailabilityAPI = async (req, res) => {


 try { 
    const { tour, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate,tour });
          res.json({ success: true, isAvailable })
        } catch (error) { 
            res.json({ success: false, message: error.message })
             } 


 }

 //API to create a new Booking

 //POST /api/booking/book

 export const createBooking =async (req, res) =>{

    try { 
        const { tour, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user_id;
        
        // Before Booking Check Availability 
        
        const isAvailable = await checkAvailability({ 
            checkInDate, 
            checkOutDate,
            tour
        
        }); 

        if(!isAvailable){

            return res.json({success: false, message: "Tour is not available for the selected dates"})

        }
        // Get totalPrice from Tour

        const tourData = await Tour.findById(tour).populate("existingPackage"); 
        let totalPrice = tourData.pricePerNight;
         // Calculate totalPrice 
         const checkin = new Date(checkInDate)
         const checkout = new Date(checkOutDate)
         const timeDiff = checkout.getTime() - checkin.getTime();
          const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
          totalPrice *= nights;

          const booking = await Booking.create({ 
            user,
            tour,
            existingPackage: tourData.existingPackage._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice, 
            })
            
            res.json({ success: true, message: "Booking created successfully"})
        
        } catch (error) { 
            console.log(error);
            res.json({ success: false, message: "Failed to create booking"})
        
        }

    };

    //API to get all bookings for a user
    //GET /api/bookings/user

   export const getUserBookings = async (req, res) => { 
    
    try { 
        
        const user = req.user_id; 
        const bookings = await Booking.find({user}).populate("tour existingPackage").sort({createdAt: -1})
         res.json({ success: true, bookings}) 
        } catch (error) { 
            res.json({ success: false, message: "Failed to fetch bookings"});
            
        }
    }
 
    export const getPackageBookings = async (req, res) => { 
        try {
             const existingPackage = await Package.findOne({ owner: req.auth.userId });
              if (!existingPackage) {
                 return res.json({ success: false, message: "Package not found" });
                 }
                  
                 const bookings = await Booking.find({ existingPackage: existingPackage.id }).populate("tour existingPackage user").sort({ createdAt: -1 });
                    
                    // Total Bookings 
                    const totalBookings = bookings.length; 
                    // Total Revenue 
                    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)
                    res.json({ success: true, dashboardData: { totalBookings, totalRevenue,bookings } })   
                    } catch (error) {    
                        res.json({ success: false, message: "Failed to fetch package bookings"})
                    } 
                }


