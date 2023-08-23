const { Schema, model } = require("mongoose");
// Je dois importer user et Coach?

const bookingSchema = new Schema(
  {
    training: {
      type: Schema.types.ObjectId,
      ref: "Training",
    },
    initiator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    toNotify: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    coach: {
      type: Schema.Types.ObjectId,
      ref: "Coach",
    },
    hasBeenSeen: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "archived", "cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
