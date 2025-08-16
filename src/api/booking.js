import express from 'express'
import { createBooking, getAllBookingForPlace, getAllBookings } from '../application/Booking.js';

const bookingRouter = express.Router();
bookingRouter.route("/").post(createBooking).get(getAllBookings);
bookingRouter.route("places/:placeId").get(getAllBookingForPlace);

export default bookingRouter;