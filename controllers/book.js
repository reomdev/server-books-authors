'use strict'

const bookServices = require('../services/book');
const authorServices = require('../services/author');
const filesServices = require('../services/files')
const authorBookServices = require('../services/authorBook');

const init = (req, res) => { res.status(200).send({ msg : 'INIT BOOKS' }) }

const create = (req, res) => {
    try {
        const data = req.body;
        let existBookById = authorBookServices.searchAuthorBookById(data);
        
        if(!existBookById){
            let bookCreated = bookServices.newBook(data);
            let authorBook = authorBookServices.newAuthorBook({"idAuthor": data.idAuthor, "idBook": data.id});

            if(bookCreated && authorBook)
                res.status(200).send({"msg":"Book created"});
            else
                res.status(409).send({"msg":"An error occurred creating the book"});
        }else{
            res.status(409).send({"msg":"This book exist"});
        }
    } catch (error) {
        res.status(400).send("Book not created");
    }
}

const all = (req, res) => {
    try {
        const data = filesServices.returnDataFiles('books');
        let copyData = [...data.books];
        
        copyData.forEach(book => {
            book.author = authorServices.searchAuthorById(book.idAuthor);
            delete book.idAuthor;
        });

        res.status(200).send({msg : 'All books', data});
    } catch (error) {
        console.log(error);
        res.status(404).send({msg : 'File not found', error});
    }
}

module.exports = {
    create,
    all,
    init
}