const router = require("express").Router();
const Booking = require("../models/Booking.model");

router.post("/", (req, res, next) => {
  Booking.create(req.body)
    .then((createdBooking) => res.status(200).json(createdBooking))
    .catch((e) => next(e));
});

router.get("/", (req, res, next) => {
  Booking.find()
    .then((allBookings) => res.status(200).json(allBookings))
    .catch((e) => next(e));
});

// Get active bookings of a client
router.get("/client", async (req, res, next) => {
  try {
    const clientBookings = await Booking.find({
      $and: [
        { client: req.payload._id },
        { status: { $in: ["pending", "active"] } },
      ],
    }).populate("training");
    res.json(clientBookings);
  } catch (error) {
    next(error);
  }
});

// Get active bookings of a coach
router.get("/coach", async (req, res, next) => {
  try {
    const coachBookings = await Booking.find({
      $and: [
        { coach: req.payload._id },
        {
          status: {
            $in: [
              "pending",
              "active",
              "archived",
              "cancelRequested",
              "cancelledConfirmed",
            ],
          },
        },
      ],
    }).populate("training");
    res.json(coachBookings);
  } catch (error) {
    next(error);
  }
});
// Get the booking of a client for one specific class
router.get("/client/:trainingId", async (req, res, next) => {
  try {
    const clientTrainingBooking = await Booking.find({
      client: req.payload._id,
      training: req.params.trainingId,
      status: "active",
    }).populate("training");
    console.log("response from the server:", clientTrainingBooking);
    res.json(clientTrainingBooking);
  } catch (error) {
    next(error);
  }
});

router.get("/:bookingId", (req, res, next) => {
  const bookingId = req.params.bookingId;
  Booking.findById(bookingId)
    .then((foundBooking) => res.status(200).json(foundBooking))
    .catch((e) => next(e));
});

router.patch("/:bookingId", (req, res, next) => {
  const bookingId = req.params.bookingId;
  Booking.findByIdAndUpdate(bookingId, req.body, { new: true })
    .then((updatedBooking) => res.status(200).json(updatedBooking))
    .catch((e) => next(e));
});

router.delete("/:bookingId", (req, res, next) => {
  const bookingId = req.params.bookingId;
  Booking.findByIdAndDelete(bookingId)
    .then(() => {
      res.status(200).json({ message: "booking successfully deleted" });
    })
    .catch((e) => next(e));
});

module.exports = router;
