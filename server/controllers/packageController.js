import Package from "../models/Package.js";
import User from "../models/User.js";

export const registerPackage = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id

        //Check if the use is already Registered
        const existingPackage  = await Package.findOne({ owner });
        if (existingPackage ) {
            return res.json({ success: false, message: "Package Already Registered" });
        }

        await Package.create({ name, address, contact, city, owner });

        await User.findByIdAndUpdate(owner, {role: "packageOwner"})

        res.json({success: true, message: "Package Registered Successfully"});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}