//for JSON files, leave array of objects only.

const { Book } =
  require('../models')[
    ({
      title: 'The DaVinci Code',
      author: 'Dan Brown',
      isbn: 9780307474278,
      pages: 597,
      user_id: 1234,
    },
    {
      title: 'The Lost World',
      author: 'Michael Crichton',
      isbn: 9780345538994,
      pages: 416,
      user_id: 1234,
    },
    {
      title: "The Beatles A Hard Day's Night",
      author: 'Mark Lewisohn',
      isbn: 9780714871851,
      pages: 1234,
      user_id: 1234,
    },
    {
      title: 'The Greatest Show on Earth',
      author: 'Richard Dawkins',
      isbn: 9781416594796,
      pages: 572,
      user_id: 1,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: 9780062368683,
      pages: 336,
      user_id: 1,
    },
    {
      title: 'A Time to Kill',
      author: 'John Grisham',
      isbn: 9780385338608,
      pages: 515,
      user_id: 1,
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: 9780743246392,
      pages: 165,
      user_id: 1,
    },
    {
      title: 'A Clockwork Orange',
      author: 'Anthony Burgess',
      isbn: 9780393312836,
      pages: 192,
      user_id: 1,
    },
    {
      title: 'One Hundred Years of Solitude',
      author: 'Gabriel Garcia Marquez',
      isbn: 9780060531041,
      pages: 417,
      user_id: 1,
    },
    {
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoyevsky',
      isbn: 9780486415871,
      pages: 430,
      user_id: 1,
    },
    {
      title: 'Madame Bovary',
      author: 'Gustave Flaubert',
      isbn: 9780553213416,
      pages: 424,
      user_id: 1,
    },
    {
      title: 'The Divine Comedy',
      author: 'Dante Alighieri ',
      isbn: 9781101117996,
      pages: 928,
      user_id: 1,
    },
    {
      title: 'The Complete Sherlock Holmes Volume 3',
      author: 'Sir Arthur Conan Doyle',
      isbn: 9780385006897,
      pages: 1122,
      user_id: 1,
    },
    {
      title: 'Murder on the Orient Express',
      author: 'Agatha Christie',
      isbn: 9781444802504,
      pages: 344,
      user_id: 1,
    },
    {
      title: 'The Jungle Book',
      author: 'Rudyard Kipling',
      isbn: 9789176393918,
      pages: 151,
      user_id: 1,
    },
    {
      title: 'Great Expectations',
      author: 'Charles Dickens',
      isbn: 9781853260049,
      pages: 395,
      user_id: 1,
    })
  ];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
