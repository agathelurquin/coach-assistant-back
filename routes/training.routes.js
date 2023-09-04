const router = require("express").Router();
const { isAuthenticated, isCoach } = require("../middleware/jwt.middleware");
const Training = require("../models/Training.model");

router.post("/", (req, res, next) => {
  Training.create(req.body)
    .then((createdTraining) => res.status(201).json(createdTraining))
    .catch((e) => next(e));
});

router.get("/", (req, res, next) => {
  Training.find()
    .then((allTrainings) => res.status(200).json(allTrainings))
    .catch((e) => next(e));
});
router.get("/past", (req, res, next) => {
  Training.find()
    .then((allTrainings) => {
      let previousTrainings = [];
      for (let training of allTrainings) {
        if (new Date(training.trainingDate) <= new Date()) {
          console.log("before");
          previousTrainings.push(training);
        }

        res.status(200).json(previousTrainings);
      }
    })
    .catch((e) => next(e));
});

router.get("/:trainingId", (req, res, next) => {
  const trainingId = req.params.trainingId;
  Training.findById(trainingId)
    .then((foundTraining) => res.status(200).json(foundTraining))
    .catch((e) => next(e));
});

// Get classes by coach
router.get("/coach/:coachId", isCoach, async (req, res, next) => {
  console.log("the coach id", req.payload._id, "params", req.params);
  try {
    const coachId = req.params.coachId;
    const coachTrainings = await Training.find({ coach: coachId });
    res.json(coachTrainings);
  } catch (e) {
    next(e);
  }
});

router.patch("/:trainingId", isCoach, async (req, res, next) => {
  const trainingId = req.params.trainingId;
  try {
    const training = await Training.findOne({
      _id: trainingId,
      coach: req.payload._id,
    });
    if (training.participants.length >= training.availableSpots) {
      return res.json({ message: "No available spots" });
    }
    training.participants = req.body.participants;
    if (training.participants.length === training.availableSpots) {
      training.booked = true;
    }

    const updatedTraining = await training.save();
    return res.json(updatedTraining);
  } catch (error) {
    next(error);
  }

  // Training.findOne({ _id: trainingId, coach: req.payload._id })
  //   .then((training) => {
  //     if (training.participants.length >= training.availableSpots) {
  //       training.booked = true;
  //       training.save().then((_) => {
  //         res.json({ message: "No available spots" });
  //       });
  //     }
  //     training.participants = req.body.participants;
  //     return training.save();
  //   })
  //   .then((updatedDocument) => {
  //     res.json(updatedDocument);
  //   })
  //   .catch((e) => next(e));
});

router.delete("/:trainingId", isCoach, (req, res, next) => {
  const trainingId = req.params.trainingId;
  Training.findOneAndDelete({ _id: trainingId, coach: req.payload._id })
    .then(() =>
      res.status(200).json({ message: "training successfully deleted" })
    )
    .catch((e) => next(e));
});

module.exports = router;
