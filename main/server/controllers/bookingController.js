import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js";
import Package from "../models/Package.js";
import Tour from "../models/Tour.js";


const checkAvailability = async ({ ArrivalDate, DepartureDate, tour })=>{


try{

  const bookings= await Booking.find({

       tour,
       ArrivalDate: { $lte: DepartureDate },
       DepartureDate: { $gte: ArrivalDate },

  });
  
  const isAvailable = bookings.length === 0;
  return isAvailable;



}catch (error){

    console.error(error.message);
    return false;

}


}

 // API to check availability of tour
 //POST /api/bookings/check-availability

 export const checkAvailabilityAPI = async (req, res) => {


 try { 
    const { tour, ArrivalDate, DepartureDate } = req.body;
    const isAvailable = await checkAvailability({ ArrivalDate, DepartureDate,tour });
          res.json({ success: true, isAvailable })
        } catch (error) { 
            res.json({ success: false, message: error.message })
             } 


 }

 //API to create a new Booking

 //POST /api/booking/book

 //API to create a new Booking
//POST /api/booking/book

export const createBooking = async (req, res) => {
    try { 
        const { tour, ArrivalDate, DepartureDate, guests } = req.body;
        const user = req.user_id;
        
        // Before Booking Check Availability 
        const isAvailable = await checkAvailability({ 
            ArrivalDate, 
            DepartureDate,
            tour
        }); 

        if(!isAvailable){
            return res.json({success: false, message: "Tour is not available for the selected dates"})
        }

        // Get totalPrice from Tour
        const tourData = await Tour.findById(tour).populate("existingPackage"); 
        let totalPrice = tourData.pricePerNight;
        
        // Calculate totalPrice 
        const checkin = new Date(ArrivalDate)
        const checkout = new Date(DepartureDate)
        const timeDiff = checkout.getTime() - checkin.getTime();
        const travels = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        totalPrice *= travels * guests;

        const booking = await Booking.create({ 
            user,
            tour,
            existingPackage: tourData.existingPackage._id,
            guests: +guests,
            ArrivalDate,
            DepartureDate,
            totalPrice, 
        })
        
        // Send confirmation email with error handling
        try {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: req.user.email,
                subject: 'Tour Package Booking Confirmation',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Your Booking Confirmation</h2>
                        <p>Dear ${req.user.username || 'Valued Customer'},</p>
                        <p>Thank you for your booking! Here are your details:</p>
                        
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            <h3 style="color: #4CAF50; margin-top: 0;">Booking Details</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${booking._id}</td></tr>
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Tour Package:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${tourData.existingPackage.name}</td></tr>
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${tourData.existingPackage.address}</td></tr>
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Arrival Date:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${booking.ArrivalDate.toDateString()}</td></tr>
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Departure Date:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${booking.DepartureDate.toDateString()}</td></tr>
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Number of Guests:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${booking.guests}</td></tr>
                                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Duration:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${travels} day(s)</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Total Amount:</strong></td><td style="padding: 8px 0; color: #4CAF50; font-size: 18px; font-weight: bold;">${process.env.CURRENCY || '৳'} ${booking.totalPrice}</td></tr>
                            </table>
                        </div>
                        
                        <p style="color: #4CAF50; font-weight: bold;">We look forward to welcoming you!</p>
                        <p>If you need to make any changes or have questions, feel free to contact us.</p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                            <p>This is an automated confirmation email. Please keep this email for your records.</p>
                        </div>
                    </div>
                `
            }

            await transporter.sendMail(mailOptions)
            console.log(`Confirmation email sent to ${req.user.email}`);
            
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail the booking if email fails, just log the error
        }

        res.json({ 
            success: true, 
            message: "Booking created successfully",
            bookingId: booking._id
        })
        
    } catch (error) { 
        console.log('Booking creation error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Failed to create booking" 
        });
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
             const existingPackage = await Package.findOne({ owner: req.user_id });
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

            // Confirm payment API
// POST /api/bookings/confirm-payment
export const confirmPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Mark as paid and update payment method
    booking.isPaid = true;
    booking.paymentMethod = paymentMethod || "Unknown";

    // You can optionally update booking status here, e.g.:
    booking.status = "confirmed";

    await booking.save();

    res.json({ success: true, message: "Payment confirmed and booking updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Could not confirm payment" });
  }
};

    

