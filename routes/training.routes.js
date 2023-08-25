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

router.get("/:trainingId", (req, res, next) => {
  const trainingId = req.params.trainingId;
  Training.findById(trainingId)
    .then((foundTraining) => res.status(200).json(foundTraining))
    .catch((e) => next(e));
});

// Get classes by coach
router.get("/coach", isCoach, async (req, res, next) => {
  try {
    const coachId = req.payload._id;
    const coachTrainings = await Training.find({ coach: coachId });
    res.json(coachTrainings);
  } catch (e) {
    next(e);
  }
});

router.patch("/:trainingId", isCoach, (req, res, next) => {
  const trainingId = req.params.trainingId;
  Training.findOneAndUpdate(
    { _id: trainingId, coach: req.payload._id },
    req.body,
    { new: true }
  )
    .then((updatedTraining) => res.status(200).json(updatedTraining))
    .catch((e) => next(e));
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
