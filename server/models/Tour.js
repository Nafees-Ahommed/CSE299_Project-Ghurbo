import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    existingPackage: {type: String, ref: 'Package', required: true},
    tourType: {type: String, required: true},
    pricePerNight: {type: Number , required: true},
    amenities: {type: Array, required: true},
    images: [{type: String}],
    isAvailable: { type: Boolean, default: true},

},{timestamps: true})

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;