const { User } = require('../models');

const userData = [
  {
    name: 'Johnny Smith',
    email: 'jsmith84@gmail.com',
    password: 'password12345',
    number_of_books: 4,
  },
  {
    name: 'Luis Scott-Vargas',
    email: 'THE-LSV@gmail.com',
    password: 'password12345',
    number_of_books: 2,
  },
  {
    name: 'Reid Duke',
    email: 'reider85@gmail.com',
    password: 'password12345',
    number_of_books: 3,
  },
  {
    name: 'Jimmy Davis',
    email: 'jimmydean.com',
    password: 'password12345',
    number_of_books: 1,
  },
  {
    name: 'Andrew Tran',
    email: 'andyt@gmail.com',
    password: 'password12345',
    number_of_books: 6,
  },
  {
    name: 'Andrea Stickland',
    email: 'Dreainthestix@gmail.com',
    password: 'password12345',
    number_of_books: 7,
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedGallery;
