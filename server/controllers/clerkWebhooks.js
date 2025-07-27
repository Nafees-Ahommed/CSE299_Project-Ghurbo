import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try{
        //Create a Svix instance with the Clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        //Getting Headers
        const headers= {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };
        //Verifying the webhook
        await whook.verify(JSON.stringify(req.body), headers)

        //Getting data from the request body
        const { data, type } = req.body;

        //Switch case for different webhook events
        switch (type) {
            case "user.created":{
                const userData = {
                 _id: data.id,
                email: data.email_addresses[0].email_address,
                username: data.first_name + " " + data.last_name,
                image: data.profile_image_url,
                }
                //Create a new user in the database
                await User.create(userData);
                break;
            }

            case "user.updated":{
                const userData = {
                 _id: data.id,
                email: data.email_addresses[0].email_address,
                username: data.first_name + " " + data.last_name,
                image: data.profile_image_url,
                }
                //Update the user in the database
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }

            case "user.deleted":{
                //Delete the user from the database
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }
        res.json({
            success: true,
            message: "Webhook received and processed successfully"
        });
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: "Error processing webhook",
            error: error.message
        });
    }
}

export default clerkWebhooks;