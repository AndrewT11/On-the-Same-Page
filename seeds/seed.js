const sequelize = require('../config/connection');
//can add back for use with json file
// const { User, Book } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const book of bookData) {
//     await Book.create({
//       ...book,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

// seedDatabase();

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedGallery();

  await seedPaintings();

  process.exit(0);
};

seedDatabase();
