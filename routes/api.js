const router = require("express").Router();
const mongoose = require('mongoose');
const db = require('../models')
const path = require('path');

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate( [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } 
      }
    },
  ] )
    .sort({ day: 1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
// router.get('/api/workouts/',async(req,res)=>{
// const dbData=await db.Workout.findOne({})
// })
router.put("/api/workouts/:id", ( req, res) => {
  console.log(req.body)
    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } },{new:true})
      .then(dbWorkout => {
console.log(dbWorkout)
        res.json(dbWorkout);

      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
//addExercise()
//put route 
///api/workouts/:id
router.post('/api/workouts',({body},res)=>{
    db.Workout.create(body).then(
        data=>{res.json(data)}
    )
})
//createWorkout()
//posst
///api/workouts

// getWorkoutsInRange()
///api/workouts/range
router.get('/api/workouts/range',(req,res)=>{
    db.Workout.aggregate([
        {
          $addFields: { totalDuration: { $sum: "$exercises.duration" } }
        },
      ])
      .sort({ day: -1 })
      .then(workouts => {
        const lastSevenWorkouts = workouts.slice(0,7)
        res.json(lastSevenWorkouts);
      })
      .catch(err => {
        res.status(400).json(err);
      })
    });

module.exports=router