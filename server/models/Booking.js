import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({

   user: {type: String, ref: "User", required: true},
   tour: {type: String, ref: "Tour", required: true},
   existingPackage: {type: String, ref: "Package", required: true},
   ArrivalDate: {type: Date, required: true},
   DepartureDate: {type: Date, required: true},
   totalPrice: {type: Number, required: true},
   guests: {type: Number, required: true},


    status: {

        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    
},

 paymentMethod:{
    type: String,
    required: true,
    default: "Pay At Package",
 },

 isPaid: {type: Boolean, default: false}



},{ timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
