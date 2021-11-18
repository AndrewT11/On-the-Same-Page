const axios = require('axios');
// ToDO We need to wrap this in a try-catch
async function getBookByISBN(isbn) {
    try {
        console.log("this is working");
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.googleKey}`);

    } catch (error) {
        console.error(error);
    }
};

// export {
//     getBookByISBN
// };

async function getBookByAuthor(author) {
    try {
        console.log("this is working");
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=author:${author}&key=${process.env.googleKey}`);

    } catch (error) {
        console.error(error);
    }
};

// export {
//     getBookByAuthor
// };

async function getBookByTitle(title) {
    try {
        console.log("this is working");
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=title:${title}&key=${process.env.googleKey}`);

    } catch (error) {
        console.error(error);
    }
};

// export {
//     getBookByTitle
// };

async function getBookByPages(pages) {
    try {
        console.log("this is working");
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=pages:${pages}&key=${process.env.googleKey}`);

    } catch (error) {
        console.error(error);
    }
};

// export {
//     getBookByPages
// };
console.log(getBookByPages);
module.exports = {
    getBookByISBN,
    getBookByAuthor,
    getBookByTitle,
    getBookByPages
};

// ToDo We can use this same format for to return the different Query Parameters. IE, by author etc.