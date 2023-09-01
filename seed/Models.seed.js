const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
require("dotenv").config();
require("../db/index");

const { User, Coach } = require("../models/User.model");
const Training = require("../models/Training.model");
const Booking = require("../models/Booking.model");

const coaches = [];
let users = [];
const trainings = [];
let bookings = [];
const possibleSports = [
  "boxing",
  "tennis",
  "fitness",
  "running",
  "football",
  "basketball",
  "yoga",
];

const possibleStatus = [
  "pending",
  "active",
  "archived",
  "cancelRequested",
  "cancelledConfirmed",
];

const possibleDurations = ["30m", "1h", " 1h15", "1h30", "2h", "3h"];
const possibleTrainingGroup = ["private", "group", "pro"];

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Create Coaches
function generateCoaches() {
  console.log("starting to generate coaches");
  for (let i = 0; i < 20; i++) {
    let coach = {
      _id: faker.database.mongodbObjectId(),

      email: faker.internet.email(),
      password: bcrypt.hashSync("Student1!", 10),
      name: faker.internet.userName(),
      avatar: faker.image.avatar(),
      role: "coach",
      description: faker.person.bio(),
      activities: getRandom(possibleSports),
    };
    coaches.push(coach);
  }
  console.log("coaches created, coach example: ", coaches[0]);
  return coaches;
}

// Create Students
function generateClients() {
  console.log("starting to generate students");

  for (let i = 0; i < 20; i++) {
    let user = {
      _id: faker.database.mongodbObjectId(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("Student1!", 10),
      name: faker.internet.userName(),
      avatar: faker.image.avatar(),
      role: "student",
    };
    users.push(user);
  }
  console.log("students created, coach example: ", users[0]);

  return users;
}

// Create trainings:
function generateTrainings() {
  for (let i = 0; i < 50; i++) {
    const oneCoach = getRandom(coaches);
    let training = {
      _id: faker.database.mongodbObjectId(),

      name: `${getRandom(possibleSports)} with ${oneCoach.name}`,
      description: faker.company.catchPhrase(),
      trainingDate: faker.date.anytime(),
      duration: getRandom(possibleDurations),
      location: faker.location.city(),
      price: faker.commerce.price({ min: 50, max: 700, dec: 0 }),
      activityType: getRandom(possibleSports),
      coach: oneCoach._id,
      type: getRandom(possibleTrainingGroup),
      image: faker.image.urlLoremFlickr({ category: "sports" }),
      availableSpots: faker.number.int({ max: 20 }),
      participants: [], // POPULATE THIS,
    };
    trainings.push(training);
  }
  console.log("trainings created, training example: ", trainings[0]);

  return trainings;
}

// Create bookings:
function generateBookings() {
  console.log("starting to generate bookings");

  for (let i = 0; i < 50; i++) {
    let foundTraining = getRandom(trainings);
    let booking = {
      _id: faker.database.mongodbObjectId(),

      training: foundTraining._id,
      client: getRandom(users)._id,
      coach: foundTraining.coach,
      status: getRandom(possibleStatus),
    };
    bookings.push(booking);
  }
  console.log("bookings created, booking example: ", bookings[0]);

  return bookings;
}

// update trainings with actual participants

async function seed() {
  try {
    await User.deleteMany();
    generateClients();
    const allUsers = await User.create(users);
    console.log("first User", allUsers[0]);
    generateCoaches();
    const allCoaches = await Coach.create(coaches);
    console.log("first Coach", allCoaches[0]);
    await Training.deleteMany();
    await generateTrainings();
    const allTrainings = await Training.create(trainings);
    console.log("first Training", allTrainings[0]);
    await Booking.deleteMany();
    await generateBookings();
    const allBookings = await Booking.create(bookings);
    console.log("first Booking", allBookings[0]);
    async function populateTrainings() {
      console.log("starting to populate trainings");

      allTrainings.forEach((training) => {
        allBookings.forEach((booking) => {
          console.log(
            "on essaye de populer ",
            training,
            "with the booking ",
            booking
          );
          if (
            booking.training === training._id &&
            training.participants.length < training.availableSpots
          ) {
            console.log(
              "MATCHING, SO PUSHING TO ",
              "training",
              training,
              "training participants",
              training.participants,
              "from booking: ",
              booking
            );
            training.participants.push(booking.client);
          }
        });
      });
    }

    await populateTrainings();
    console.log(
      "=============     SEEDING DONE ==============",
      "first User",
      allUsers[0],
      "first Coach",
      allCoaches[0],
      "first Training",
      allTrainings[0],
      "first Booking",
      allBookings[0]
    );
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
}

seed();
