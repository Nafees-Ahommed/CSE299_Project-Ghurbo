import express from 'express'; 
import { checkAvailabilityAPI, confirmPayment, createBooking, getPackageBookings, getUserBookings,  } from '../controllers/bookingController.js'; 

import { protect } from '../middleware/authMiddleware.js';

const bookingRouter = express.Router(); 

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/existingPackage', protect, getPackageBookings);

bookingRouter.post('/confirm-payment', protect, confirmPayment);

export default bookingRouter;


