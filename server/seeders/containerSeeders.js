const Container = require("../models/Container");

module.exports = async () => {
  const containers = [
    {
      name: "bottle",
      volume: 0.5,
    },
    {
      name: "can",
      volume: 0.33,
    },
    {
      name: "keg",
      volume: 5,
    },
  ];

  await Container.insertMany(containers);
  console.log("[Database] Se corrió el seeder de Containers.");
};
