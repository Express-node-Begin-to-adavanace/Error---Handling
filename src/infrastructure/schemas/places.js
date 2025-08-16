import mongoose from "mongoose";

const placesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    suitableFor:[{
        type:String,
        required:false
    }],
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:false,
    },
    reviews:{
        type:Number,
        required:false,
    },
    price:{
        type:Number,
        required:true,
    },
    services:[{
        type:String,
        required:true,
    }]
})

const Place = mongoose.model("Places",placesSchema);
export default Place;