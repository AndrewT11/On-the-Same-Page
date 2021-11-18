const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');
const {
  getBookByISBN,
  getBookByAuthor,
  getBookByTitle,
  getBookByPages,
} = require('../../db/bookApi');

//create new book
router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      isbn: req.body.isbn,
      pages: req.body.pages,
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
