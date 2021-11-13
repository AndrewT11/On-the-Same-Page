const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');


// Create a book
router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      title: req.params.title,
      author: req.params.author,
      isbn: req.params.isbn,
      pages: req.params.pages,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Delete a book
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



