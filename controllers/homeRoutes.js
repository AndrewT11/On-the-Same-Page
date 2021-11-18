const router = require('express').Router();
const { Book, User } = require('../models');
const withAuth = require('../utils/auth');
const { getBookByISBN } = require('../db/bookApi');

// Get all users for homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Book,
          //filename will be the picture preview of the book. Should be the first in the list. filename[0]
          attributes: ['title'],
          // add file name and description back in once we can get this working.
        },
      ],
    });

    // Serialize data so the template can read it
    const users = userData.map((user) =>
      user.get({
        plain: true,
      })
    );

    // Pass serialized data and session flag into template
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get one user
router.get('/user/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [
          {
            model: Book,
            attributes: ['title', 'author', 'isbn', 'pages', 'user_id'],
          },
        ],
      });
      const user = userData.get({
        plain: true,
      });

      for (let i = 0; i < user.books.length; i++) {
        let book = user.books[i];
        let googleBook = await getBookByISBN(book.isbn);
        book.image = googleBook.data.items[0].volumeInfo.imageLinks.thumbnail;
      }

      res.render('user', {
        ...user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Book,
        },
      ],
    });

    const user = userData.get({
      plain: true,
    });

    for (let i = 0; i < user.books.length; i++) {
      let book = user.books[i];
      let googleBook = await getBookByISBN(book.isbn);
      book.image = googleBook.data.items[0].volumeInfo.imageLinks.thumbnail;
    }

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get books by Genre
router.get('/genres', withAuth, async (req, res) => {
  try {
    const genreData = await Book.findAll({
      order: [['genre', 'ASC']],
    });

    const books = genreData.map((book) =>
      book.get({
        plain: true,
      })
    );

    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      let googleBook = await getBookByISBN(book.isbn);
      book.image = googleBook.data.items[0].volumeInfo.imageLinks.thumbnail;
    }

    res.render('booklist', {
      books,
      logged_in: req.session.logged_in,
    });
  } catch {
    res.status(500).json(err);
  }
});

//Get books by Author
router.get('/authors', withAuth, async (req, res) => {
  try {
    const authorData = await Book.findAll({
      // where: {
      //   author: 1,
      // },
      order: [['author', 'ASC']],
    });

    const books = authorData.map((book) =>
      book.get({
        plain: true,
      })
    );

    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      let googleBook = await getBookByISBN(book.isbn);
      book.image = googleBook.data.items[0].volumeInfo.imageLinks.thumbnail;
    }

    res.render('booklist', {
      books,
      logged_in: req.session.logged_in,
    });
  } catch {
    res.status(500).json(err);
  }
});

// router.get('/profile', async (req, res) => {
//   try {
//  bookRoutes
//     if (req.session.loggedIn) {
//       res.render('profile');
//     }

//     res.render('login');

//     const bookData = await Book.findbyPK(req.params.id);
//     const book = bookData.get({
//       plain: true,
//     });

//     const googleBook = await getBookByISBN(book.isbn)
//     res.render('book', {
//       book,
//       loggedIn: req.session.loggedIn,

//     });
//  main
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Get one book
// router.get('/book/:id', withAuth, async (req, res) => {
//   try {
//     const bookData = await Book.findbyPK(req.params.id);
//     const book = bookData.get({
//       plain: true,
//     });
//     res.render('book', {
//       book,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
