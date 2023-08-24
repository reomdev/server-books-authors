const filesServices = require('./files');
const bookServices = require('./book');

const FILE_NAME = "authorsBooks";

const searchAuthorBookById = (bookData) => {
    const dataAuthorsBooks = filesServices.returnDataFiles(FILE_NAME);
    
    if(!dataAuthorsBooks?.error)
        return dataAuthorsBooks.authorBook.some( data => ( 
            data.idAuthor === bookData.idAuthor && 
            bookServices.searchBookById(data.idBook).title === bookData.title
        ));
    else
        return false;
}

const newAuthorBook = async (authorBook) => {
    try {
        const data = filesServices.returnDataFiles(FILE_NAME);
        data.authorBook.push(authorBook);
        filesServices.writeDataFiles(FILE_NAME, JSON.stringify(data));
        return true
    } catch (error) {
        return false
    }
}


module.exports = {
    searchAuthorBookById,
    newAuthorBook
};