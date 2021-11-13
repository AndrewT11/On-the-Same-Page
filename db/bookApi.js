const axios = require('axios');
// ToDO We need to wrap this in a try-catch
async function getBookByISBN(isbn) {
    return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.googleKey}`);
}

export {
    getBookByISBN
};

// ToDo We can use this same format for to return the different Query Parameters. IE, by author etc.