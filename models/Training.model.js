const { Schema, model } = require("mongoose");

const trainingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the training is required"],
    },
    description: {
      type: String,
      required: [true, "Description of the training is required"],
    },
    time: {
      type: String,
      required: [true, "Time of the training session required"],
    },
    day: {
      type: Date,
      required: [true, "Date is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    activityType: {
      type: String,
      required: [true, "type of activity is required"],
    },
    coach: {
      type: Schema.Types.ObjectId,
      ref: "Coach",
    },
    availableSpots: {
      type: Number,
      required: [true, "Number of spots available for this training required"],
    },
    paticipants: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  {
    timestamp: true,
  }
);

const Training = model("Training", trainingSchema);
module.exports = Training;
