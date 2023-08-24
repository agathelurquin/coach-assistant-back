const router = require("express").Router();
const { User, Coach } = require("../models/User.model");

// Get All :
router.get("/", (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((e) => next(e));
});

// Get One:
router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId) // || Coach.findById(userId), for now we probably only look into clients
    .then((foundUser) => res.status(200).json(foundUser))
    .catch((e) => next(e));
});

// Update One:
router.patch("/:userId", (req, res, next) => {
  const userId = req.params.userId;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.response(200).json(updatedUser))
    .catch((e) => next(e));
});

// Delete One:
router.delete("/:userId", (req, res, next) => {
  const userId = req.params.userId;

  User.findByIdAndDelete(userId)
    .then(() => res.status(200).json({ message: "user successfully deleted" }))
    .catch((e) => next(e));
});

module.exports = router;
