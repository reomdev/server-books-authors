const filesServices = require('./files');

const FILE_NAME = "authors";

const existAuthorByName = (authorName) => {
    const data = filesServices.returnDataFiles(FILE_NAME);
    if(data)
        return data.authors.some(author => ( author.name.trim().toLowerCase() === authorName.trim().toLowerCase()));
    else
        return false;
}

const searchAuthorById = (id) => {
    const data = filesServices.returnDataFiles(FILE_NAME);
    if(data)
        return data.authors.filter(author => ( author.id === id ))[0];
    else
        return null;
}

const newAuthor = async (author) => {
    try {
        const data = filesServices.returnDataFiles(FILE_NAME);
        author.id = filesServices.returnLastId(FILE_NAME);
        data.authors.push(author);
        filesServices.writeDataFiles(FILE_NAME, JSON.stringify(data))
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    existAuthorByName,
    searchAuthorById,
    newAuthor
};