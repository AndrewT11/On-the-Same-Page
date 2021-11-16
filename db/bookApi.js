const axios = require('axios');
// ToDO We need to wrap this in a try-catch
async function getBookByISBN(isbn) {
    try {
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.googleKey}`);
        console.log("this is working");
    } catch (error) {
        console.error(error);
    }
};

export {
    getBookByISBN
};

async function getBookByAuthor(author) {
    try {
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=author:${author}&key=${process.env.googleKey}`);
        console.log("this is working");
    } catch (error) {
        console.error(error);
    }
};

export {
    getBookByAuthor
};

async function getBookByTitle(title) {
    try {
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=title:${title}&key=${process.env.googleKey}`);
        console.log("this is working");
    } catch (error) {
        console.error(error);
    }
};

export {
    getBookByTitle
};

async function getBookByPages(pages) {
    try {
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=pages:${pages}&key=${process.env.googleKey}`);
        console.log("this is working");
    } catch (error) {
        console.error(error);
    }
};

export {
    getBookByPages
};

// ToDo We can use this same format for to return the different Query Parameters. IE, by author etc.