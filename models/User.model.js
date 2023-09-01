const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["coach", "student"],
    },
    myClasses: {
      type: [String],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

// Added fields for a coach
const User = model("User", userSchema);
const Coach = User.discriminator(
  "Coach",
  new Schema({
    description: {
      type: String,
      required: [true, "Please provide a description of your service"],
    },
    activity: {
      type: [String],
      required: true,
    },
  })
);

module.exports = { User, Coach };
