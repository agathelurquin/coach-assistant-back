const { Schema, model } = require("mongoose");
// Je dois importer user et Coach?

const bookingSchema = new Schema(
  {
    training: {
      // The class booked
      type: Schema.Types.ObjectId,
      ref: "Training",
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    // toNotify: [
    //   {
    //     If the Coach created the booking for the client, the client gets notified
    //     If a client created the booking, the coach gets the notification
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],

    // hasBeenSeen: {
    //   // need to figure this one out since their might be more than one person to see the notification
    //   type: Boolean,
    //   default: false,
    // },

    status: {
      // Manages the status if the class is in the future, has happened or has been cancelled
      type: String,
      enum: ["active", "archived", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
