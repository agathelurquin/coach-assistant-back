const { Schema, model } = require("mongoose");

const trainingSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, "Name of the training is required"],
    },
    description: {
      type: String,
      // required: [true, "Description of the training is required"],
    },
    trainingTime: {
      // new Date --> date.setHours(Number)
      type: String,
      // required: [true, "Time of the training session required"],
    },
    trainingDate: {
      // new Date --> date.setHours(Number)
      type: Date,
      // required: [true, "Time of the training session required"],
    },
    duration: {
      type: String,
      // required: [true, "Duration is required"],
    },
    location: {
      type: String,
      // required: [true, "Location is required"],
    },
    price: {
      type: Number,
      // required: [true, "price is required"],
    },
    activityType: {
      type: String,
      // required: [true, "type of activity is required"],
    },
    coach: {
      type: Schema.Types.ObjectId,
      ref: "Coach",
    },
    type: {
      type: String,
      // enum: ["private", "group", "pro"],
      default: "private",
    },
    image: {
      type: String,
    },
    availableSpots: {
      type: Number,
      default: 1,
      min: [0, "Class is full"],
      // required: [true, "Number of spots available for this training required"],
    },
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      // validate: [arrayLimit(availableSpots), `This training is full`],
    },
    booked: {
      type: Boolean,
      default: false,
      // max: [availableSpots, "class is full"],
    },
  },
  {
    timestamp: true,
  }
);

// function arrayLimit(availableSpots) {
//   return participants.length <= availableSpots;
// }

const Training = model("Training", trainingSchema);
module.exports = Training;
