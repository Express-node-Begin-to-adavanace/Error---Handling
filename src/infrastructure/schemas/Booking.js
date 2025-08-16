import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    placeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Places",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    CheckIn:{
        type:Date,
        required:true,
    },
    CheckOut:{
        type:Date,
        required:true,
    },
    PartyType:[{
        type: String,
        enum: ["Couple Party", "Crowd Party", "Mixed"],
        required: true
    }]
})

const Booking = mongoose.model("Booking",BookingSchema);

export default Booking;