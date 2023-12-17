const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

faker.locale = "en";

module.exports = async () => {
  const users = [];


  for (let i = 0; i < 10; i++) {
    users.push(
      new User({
        fullname: faker.name.fullName(),
        password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address:
          faker.address.streetAddress() +
          ", " +
          faker.address.city() +
          ", " +
          faker.address.country(),

      }),
    );
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
