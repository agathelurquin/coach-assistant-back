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
