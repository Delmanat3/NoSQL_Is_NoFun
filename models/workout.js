const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const workoutSchema=new Schema({
   day:{
       type:Date,
        default:Date.now(),
   },
    exercises:[{
        
            type:{
                type:String,
                trim:true,
               // required:"enter workout type"
            },
            name:{
                type:String,
                trim:true,
                // required:"this is the mane",
            },
            duration:{
                type:Number,
            },
        weight:Number,
        reps:Number,
        sets:Number,
        distance:Number,
}]
  
})
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
