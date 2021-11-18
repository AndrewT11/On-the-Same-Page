const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#book-title').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const description = document.querySelector('#book-desc').value.trim();
  const isbn = document.querySelector('#book-isbn').value.trim();
  const pages = document.querySelector('#book-pages').value.trim();

  if (title && author && description && isbn && pages) {
    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({ title, author, description, isbn, pages }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed add new book');
    }
  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete book');
//     }
//   }
// };

document
  .querySelector('.new-book-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.book-list')
//   .addEventListener('click', delButtonHandler);
