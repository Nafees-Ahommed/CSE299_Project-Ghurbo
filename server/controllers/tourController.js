import Package from "../models/Package.js";
import { v2 as cloudinary } from "cloudinary";
import Tour from "../models/Tour.js";
import { response } from "express";


// API to create a new tour for a package
export const createTour = async (req, res)=>{
    try {
        const {tourType, pricePerNight, amenities} = req.body;
        const existingPackage = await Package.findOne({owner: req.auth.userId})

        if(!existingPackage) return res.json({ success: false, message: "Package not found" });

        // upload images to cloudinary
        const uploadImages = req.files.map(async (file) =>{
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        // Wait for uploads to complete
        const images = await Promise.all(uploadImages)

        await Tour.create({
            existingPackage: existingPackage._id,
            tourType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        })
        res.json({ success: true, message: "Tour created successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// API to get all tours
export const getTours = async (req, res)=>{
    try {
        const tours = await Tour.find({isAvailable: true}).populate({
            path: "existingPackage",
            populate:{
                path: 'owner',
                select: 'image'
            }
        }).sort({createdAt: -1 })
        res.json({ success: true, tours});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// API to get all tours for a specific package 
export const getOwnerTours = async (req, res)=>{
    try {
        const existingPackageData = await Package.findOne({owner: req.auth.userId})
        const tours = await Tour.find({existingPackage: existingPackageData._id.toString()}).populate
        ("existingPackage");
        res.json({ success: true, tours});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// API to toggle availability of a tour
export const toggleTourAvailability = async (req, res)=>{
    try {
        const { tourId } = req.body;
        const tourData = await Tour.findById(tourId);
        tourData.isAvailable = !tourData.isAvailable;
        await tourData.save();
        res.json({ success: true, message: "Tour availability updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}