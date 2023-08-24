const router = require("express").Router();
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

router.patch("/:trainingId", (req, res, next) => {
  const trainingId = req.params.trainingId;
  Training.findByIdAndUpdate(trainingId, req.body, { new: true })
    .then((updatedTraining) => res.status(200).json(updatedTraining))
    .catch((e) => next(e));
});

router.delete("/:trainingId", (req, res, next) => {
  const trainingId = req.params.trainingId;
  Training.findByIdAndDelete(trainingId)
    .then(() =>
      res.status(200).json({ message: "training successfully deleted" })
    )
    .catch((e) => next(e));
});

module.exports = router;
