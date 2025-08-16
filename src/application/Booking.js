import Booking from "../infrastructure/schemas/Booking.js"
import NotFoundError from "../service/not-found-error.js";
import ValidationError from "../service/validation-error.js";

export const createBooking = async (req,res,next) => {
    try {
        const booking = req.body;

    //validate the request data
    if(
        !booking.placeId ||
        !booking.userId ||
        !booking.CheckIn ||
        !booking.CheckOut ||
        !booking.PartyType 
    ){
        throw new ValidationError("Booking data is invalid")
        
    }

    //Add the booking
    await Booking.create({
        placeId:booking.placeId,
        userId: booking.userId,
        CheckIn: booking.CheckIn,
        CheckOut: booking.CheckOut,
        PartyType: booking.PartyType,
    });

    //Return the response
    res.status(201).send();
    return;
    } catch (error) {
        next(error);
    }
}

export const getAllBookingForPlace = async (req,res,next) => {
    try {
        const placeId = req.params.placeId;
        const booking = await Booking.find({placeId:placeId}).populate("userId");

        res.status(200).json(booking);
        return;
    } catch (error) {
        next(error);
    }
}
export const getAllBookings = async (req,res) => {
    try {
        const places = await Booking.find();
        res.status(200).json(places);
        return;
    } catch (error) {
        throw new NotFoundError("Not found booking")
    }
}