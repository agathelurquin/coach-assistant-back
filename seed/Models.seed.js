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

const possibleDurations = ["30m", "1h", " 1h15", "1h30", "2h", "3h"];
const possibleTrainingGroup = ["private", "group", "pro"];

let maiwenn;
let aurelien;
let omar;
let laurena;
let olivia;
let aurelie;
let tiffany;
let training1;
let training2;
let training3;
let training4;
let training5;
let training6;

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Create Coaches
function generateCoaches() {
  console.log("starting to generate coaches");
  maiwenn = {
    _id: faker.database.mongodbObjectId(),

    email: "maiwenn@gmail.com",
    password: bcrypt.hashSync("Student1!", 10),
    name: "Maïwenn",
    avatar: "https://i.ibb.co/7JjPmpk/coach-maiwenn-avatar.jpg",
    role: "coach",
    description: faker.person.bio(),
    activities: getRandom(possibleSports),
  };
  coaches.push(maiwenn);
  aurelien = {
    _id: faker.database.mongodbObjectId(),

    email: "aurelien@gmail.com",
    password: bcrypt.hashSync("Student1!", 10),
    name: "Aurelien",
    avatar: "https://i.ibb.co/xm08kJX/coach-aurelien-avatar.jpg",
    role: "coach",
    description: faker.person.bio(),
    activities: getRandom(possibleSports),
  };
  coaches.push(aurelien);
  omar = {
    _id: faker.database.mongodbObjectId(),

    email: "omar@gmail.com",
    password: bcrypt.hashSync("Student1!", 10),
    name: "Omar",
    avatar: "https://i.ibb.co/rZddjvM/coach-omar-avatar.jpg",
    role: "coach",
    description: faker.person.bio(),
    activities: "boxing",
  };
  coaches.push(omar);
  laurena = {
    _id: faker.database.mongodbObjectId(),

    email: "laurena@gmail.com",
    password: bcrypt.hashSync("Student1!", 10),
    name: "Laurena",
    avatar: "https://i.ibb.co/hgPwWbk/coach-laurena-avatar.jpg",
    role: "coach",
    description: faker.person.bio(),
    activities: "boxing",
  };
  coaches.push(laurena);

  for (let i = 0; i < 20; i++) {
    let coach = {
      _id: faker.database.mongodbObjectId(),

      email: faker.internet.email(),
      password: bcrypt.hashSync("Student1!", 10),
      name: faker.person.fullName(),
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
  olivia = {
    _id: faker.database.mongodbObjectId(),
    email: "olivia@gmail.com",
    password: bcrypt.hashSync("Student1!", 10),
    name: "Olivia",
    avatar: "https://i.ibb.co/2YBMRDQ/olivia-avatar.jpg",
    role: "student",
  };
  users.push(olivia);
  aurelie = {
    _id: faker.database.mongodbObjectId(),
    email: "aurelie@gmail.com",
    password: bcrypt.hashSync("Student1!", 10),
    name: "Aurelie",
    avatar: "https://i.ibb.co/KxPBJgz/aurelie-avatar.jpg",
    role: "student",
  };
  users.push(aurelie);
  tiffany = {
    _id: faker.database.mongodbObjectId(),
    email: "tiffany@gmail.com",
    password: bcrypt.hashSync("Student1!", 10),
    name: "Tiffany",
    avatar: "https://i.ibb.co/Xb0GyVt/tiffany-avatar.jpg",
    role: "student",
  };
  users.push(tiffany);
  diana = {
    _id: faker.database.mongodbObjectId(),
    email: "diana@gmail.com",
    password: bcrypt.hashSync("Student1!", 10),
    name: "Diana",
    avatar: "https://i.ibb.co/zfWkX3M/diana-avatar-copy.jpg",
    role: "student",
  };
  users.push(diana);

  for (let i = 0; i < 20; i++) {
    let user = {
      _id: faker.database.mongodbObjectId(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("Student1!", 10),
      name: faker.person.fullName(),
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
  training1 = {
    _id: faker.database.mongodbObjectId(),

    name: ` Open Boxing Class on the Quai the Seine`,
    description: faker.company.catchPhrase(),
    trainingDate: faker.date.between({
      from: "2023-09-09T00:00:00.000Z",
      to: "2023-09-12T00:00:00.000Z",
    }),
    duration: getRandom(possibleDurations),
    location: "Passerelle Léopold-Sédar-Senghor",
    price: 15,
    activityType: "boxing",
    coach: maiwenn._id,
    type: "group",
    image: "https://i.ibb.co/tPkc5sw/training-boxing-0.jpg.jpg",
    availableSpots: 15,
    participants: [aurelie._id, diana._id, olivia._id], // POPULATE THIS,
  };
  trainings.push(training1);
  training6 = {
    _id: faker.database.mongodbObjectId(),

    name: `Cardio / Boxing`,
    description: faker.company.catchPhrase(),
    trainingDate: faker.date.between({
      from: "2023-09-09T00:00:00.000Z",
      to: "2023-09-12T00:00:00.000Z",
    }),
    duration: getRandom(possibleDurations),
    location: "Paris",
    price: 15,
    activityType: "boxing",
    coach: maiwenn._id,
    type: "group",
    image: "https://i.ibb.co/PG5N4ns/training-boxing-2.jpg",
    availableSpots: 20,
    participants: [aurelie._id], // POPULATE THIS,
  };
  trainings.push(training6);
  training3 = {
    _id: faker.database.mongodbObjectId(),

    name: `Cardio Training
    `,
    description: faker.company.catchPhrase(),
    trainingDate: faker.date.between({
      from: "2023-09-09T00:00:00.000Z",
      to: "2023-09-13T00:00:00.000Z",
    }),
    duration: getRandom(possibleDurations),
    location: "Temple Noble Art",
    price: 15,
    activityType: "cardio",
    coach: maiwenn._id,
    type: "group",
    image: "https://i.ibb.co/tpZZMRw/training-cardio-1.jpg",
    availableSpots: 20,
    participants: [diana._id], // POPULATE THIS,
  };
  trainings.push(training3);
  training4 = {
    _id: faker.database.mongodbObjectId(),

    name: `Private Boxing Class
    `,
    description: faker.company.catchPhrase(),
    trainingDate: faker.date.between({
      from: "2023-09-09T00:00:00.000Z",
      to: "2023-09-18T00:00:00.000Z",
    }),
    duration: getRandom(possibleDurations),
    location: "Parc Monceau",
    price: 1,
    activityType: "cardio",
    coach: maiwenn._id,
    type: "group",
    image: "https://i.ibb.co/kSkWXnW/training-boxe-1.jpg",
    availableSpots: 1,
    participants: [diana._id], // POPULATE THIS,
  };
  trainings.push(training4);

  training2 = {
    _id: faker.database.mongodbObjectId(),

    name: `2h Tennis Private Class`,
    description: faker.company.catchPhrase(),
    trainingDate: faker.date.between({
      from: "2023-09-09T00:00:00.000Z",
      to: "2023-09-12T00:00:00.000Z",
    }),
    duration: "2h",
    location: "Clichy",
    price: 4,
    activityType: "tennis",
    coach: omar._id,
    type: "private",
    image: "https://i.ibb.co/0nBjhy3/taining-tennis-0-jpg.jpg",
    availableSpots: 4,
    participants: [aurelie._id, diana._id, olivia._id, tiffany._id], // POPULATE THIS,
  };
  trainings.push(training2);
  training5 = {
    _id: faker.database.mongodbObjectId(),

    name: `High Intensity Interval Training`,
    description: faker.company.catchPhrase(),
    trainingDate: faker.date.between({
      from: "2023-09-09T00:00:00.000Z",
      to: "2023-09-12T00:00:00.000Z",
    }),
    duration: "45h",
    location: "Paris",
    price: 30,
    activityType: "HIIT",
    coach: omar._id,
    type: "group",
    image: "https://i.ibb.co/y6JrWjv/training-hiit-0.jpg",
    availableSpots: 10,
    participants: [aurelie._id, diana._id, olivia._id, tiffany._id], // POPULATE THIS,
  };
  trainings.push(training5);

  for (let i = 0; i < 50; i++) {
    const oneCoach = getRandom(coaches);
    let training = {
      _id: faker.database.mongodbObjectId(),

      name: `${getRandom(possibleSports)} with ${oneCoach.name}`,
      description: faker.company.catchPhrase(),
      trainingDate: faker.date.between({
        from: "2023-06-01T00:00:00.000Z",
        to: "2023-09-15T00:00:00.000Z",
      }),
      duration: getRandom(possibleDurations),
      location: faker.location.city(),
      price: faker.commerce.price({ min: 50, max: 700, dec: 0 }),
      activityType: getRandom(possibleSports),
      coach: oneCoach._id,
      type: getRandom(possibleTrainingGroup),
      image: faker.image.urlPicsumPhotos(),
      availableSpots: faker.number.int({ max: 20 }),
      participants: [], // POPULATE THIS,
    };
    trainings.push(training);
  }
  console.log("trainings created, training example: ", trainings[0]);

  return trainings;
}

function checkBooking(foundTraining) {
  if (foundTraining.trainingDate <= new Date()) {
    possibleStatus = ["archived", "cancelledConfirmed"];
  } else {
    possibleStatus = [
      "pending",
      "active",
      "archived",
      "cancelRequested",
      "cancelledConfirmed",
    ];
  }
}

// Create bookings:
function generateBookings() {
  console.log("starting to generate bookings");
  let booking1 = {
    _id: faker.database.mongodbObjectId(),

    training: training1._id,
    client: aurelie._id,
    coach: maiwenn._id,
    status: "pending",
  };
  bookings.push(booking1);
  let booking2 = {
    _id: faker.database.mongodbObjectId(),

    training: training1._id,
    client: diana._id,
    coach: maiwenn._id,
    status: "pending",
  };
  bookings.push(booking2);
  let booking3 = {
    _id: faker.database.mongodbObjectId(),

    training: training1._id,
    client: olivia._id,
    coach: maiwenn._id,
    status: "pending",
  };

  let booking6 = {
    _id: faker.database.mongodbObjectId(),

    training: training2._id,
    client: aurelie._id,
    coach: maiwenn._id,
    status: "pending",
  };
  bookings.push(booking6);
  let booking7 = {
    _id: faker.database.mongodbObjectId(),

    training: training2._id,
    client: diana._id,
    coach: maiwenn._id,
    status: "pending",
  };
  bookings.push(booking7);
  let booking8 = {
    _id: faker.database.mongodbObjectId(),

    training: training2._id,
    client: olivia._id,
    coach: maiwenn._id,
    status: "pending",
  };
  bookings.push(booking8);

  let booking9 = {
    _id: faker.database.mongodbObjectId(),

    training: training2._id,
    client: tiffany._id,
    coach: maiwenn._id,
    status: "pending",
  };
  bookings.push(booking9);

  bookings.push(booking3);
  let booking4 = {
    _id: faker.database.mongodbObjectId(),

    training: training3._id,
    client: diana._id,
    coach: maiwenn._id,
    status: "pending",
  };
  bookings.push(booking4);
  let booking5 = {
    _id: faker.database.mongodbObjectId(),

    training: training4._id,
    client: diana._id,
    coach: maiwenn._id,
    status: "pending",
  };
  bookings.push(booking5);

  for (let i = 0; i < 150; i++) {
    let foundTraining = getRandom(trainings);
    checkBooking(foundTraining);
    let booking = {
      _id: faker.database.mongodbObjectId(),

      training: foundTraining._id,
      client: getRandom(users)._id,
      coach: foundTraining.coach,
      status: getRandom(possibleStatus),
    };
    bookings.push(booking);
    console.log(
      "bookings created, booking example: ",
      booking.status,
      foundTraining.trainingDate
    );
  }

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
          // console.log(
          //   "on essaye de populer ",
          //   training,
          //   "with the booking ",
          //   booking
          // );
          // console.log(
          //   "MATCHING, SO PUSHING TO ",
          //   "training",
          //   training,
          //   "training participants",
          //   training.participants,
          //   "from booking: ",
          //   booking
          if (
            booking.training === training._id &&
            training.participants.length < training.availableSpots
          ) {
            training.participants.push(booking.client);
          }
        });
      });
    }

    await populateTrainings();
    async function log() {
      console.log(
        "=============     SEEDING DONE =============="
        // "first User",
        // allUsers,
        // "first Coach",
        // allCoaches,
        // "first Training",
        // allTrainings,
        // "first Booking",
        // allBookings
      );
    }
    // await log();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
}

seed();
