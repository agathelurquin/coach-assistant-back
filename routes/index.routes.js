const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// status verification middleware
router.use(isAuthenticated);
router.use("/users", require("./user.routes"));
router.use("/trainings", require("./training.routes"));
router.use("/bookings", require("./booking.routes"));

module.exports = router;
