const router = require('express').Router();
const { Book, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all users for homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Book,
          //filename will be the picture preview of the book. Should be the first in the list. filename[0]
          attributes: ['title'],
          //add attribute of picture when we pull from isbn
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
  if (!req.session.loggedIn) {
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

      res.render('user', {
        user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//Get one book
router.get('/book/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.findbyPK(req.params.id);
    const book = bookData.get({
      plain: true,
    });
    res.render('book', {
      book,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
