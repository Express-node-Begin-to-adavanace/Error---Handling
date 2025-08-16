import express from "express";
import {createPlace, deletePlace, getAllPlaces, getPlaceById, updateHotel} from '../application/places.js'

const placesRouter = express.Router();

placesRouter.route("/").get(getAllPlaces).post(createPlace);
placesRouter.route("/:id").get(getPlaceById).delete(deletePlace).put(updateHotel);

export default placesRouter;