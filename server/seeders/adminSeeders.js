const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const admins = [
    {
      name: "Esteban Castañeira",
      email: "estebanc_b@hotmail.com",
      password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
    },
    {
      name: "Lorena Rincón",
      email: "lorec.rincon@gmail.com",
      password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
    },
    {
      name: "Victoria Perera",
      email: "mvperera@gmail.com",
      password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
    },
    {
      name: "Nicolas Martinez",
      email: "nicomar2004@gmail.com",
      password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
    },
    {
      name: "Noah Sugliano",
      email: "noah.sugliano@gmail.com",
      password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
    },
    {
      name: "Admin Test",
      email: "test@test.com",
      password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
    },
  ];

  await Admin.insertMany(admins);
  console.log("[Database] Se corrió el seeder de Admin.");
};
