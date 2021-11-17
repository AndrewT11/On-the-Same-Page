const router = require('express').Router();
const {
  Book
} = require('../../models');
const withAuth = require('../../utils/auth');
const {
  getBookByISBN,
  getBookByAuthor,
  getBookByTitle,
  getBookByPages
} = require('../../db/bookApi');

//create new book
router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to get all books
router.get('/', withAuth, async (req, res) => {
  const bookData = await Book.findAll().catch((err) => {
    res.json(err);
  });
  const books = bookData.map((book) => book.get({ plain: true }));
  res.render('all', { books });
});

//get one book by id
// router.get('/:id', withAuth, async (req, res) => {
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

//Get books by Genre
router.get('/', withAuth, async (req, res) => {
  try {
    const genreData = await Book.findAll({
      order: [['genre', 'ASC']],
    });

    const genres = genreData.map((book) => book.get({ plain: true }));

    res.render('genre', {
      genres,
      logged_in: req.session.logged_in,
    });
  } catch {
    res.status(500).json(err);
  }
});

//Get books by Author
router.get('/', withAuth, async (req, res) => {
  try {
    const authorData = await Book.findAll({
      where: {
        author: 1,
      },
      order: [['author', 'ASC']],
    });

    const authors = authorData.map((book) => book.get({ plain: true }));

    res.render('author', {
      authors,
      logged_in: req.session.logged_in,
    });
  } catch {
    res.status(500).json(err);
  }
});

//delete book
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const bookData = await Book.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!bookData) {
//       res.status(404).json({ message: 'No book found with this id!' });
//       return;
//     }

//     res.status(200).json(bookData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;