const filesServices = require('./files');

const FILE_NAME = "books";

const existBookById = (bookData) => {
    const data = filesServices.returnDataFiles(FILE_NAME);
    if(data)
        return data.books.some(book => ( book.id === bookData.id ));
    else
        return false;
}

const searchBookById = (id) => {
    const data = filesServices.returnDataFiles(FILE_NAME);
    if(data)
        return data.books.filter(book => ( book.id === id ))[0];
    else
        return null;
}

const newBook = async (book) => {
    try {
        const data = filesServices.returnDataFiles(FILE_NAME);
        book.id = filesServices.returnLastId(FILE_NAME);
        data.books.push(book);
        filesServices.writeDataFiles(FILE_NAME, JSON.stringify(data))
        return true
    } catch (error) {
        return false
    }
}

const returnBooksByAuthor = (idAuthor) => {
    const data = filesServices.returnDataFiles(FILE_NAME);
    if(data)
        return data.books.filter(book => ( book.idAuthor === idAuthor ));
    else
        return null;
}

module.exports = {
    existBookById,
    newBook,
    searchBookById,
    returnBooksByAuthor
}