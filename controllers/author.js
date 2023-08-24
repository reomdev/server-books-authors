const filesServices = require('../services/files');
const authorService = require('../services/author');
const bookService = require('../services/book');

const init = (req, res) => { res.status(200).send({ msg : 'INIT AUTHORS' });}

const create = (req, res) => {
    try {
        const data = req.body;
        const author = authorService.existAuthorByName(data.name);
        if(author){
            res.status(409).send({"msg": "This author already exists"})
        }else{
            let authorCreate = authorService.newAuthor(data);
            if(authorCreate)
                res.status(200).send({"msg": "Author created"})
            else
                res.status(409).send({"msg":"An error occurred creating the author"});
        }
    } catch (error) {

        res.status(400).send({"msg": "ERROR", error})
    }
}

const all = (req, res) => {
    try {
        
        const data = filesServices.returnDataFiles('authors');
        let copyData = [...data.authors];

        copyData.forEach(author => {
            author.books = bookService.returnBooksByAuthor(author.id);
        })

        res.status(200).send({msg : 'All authors', data });

    } catch (error) {
        console.log(error);
        res.status(404).send({msg : 'File not found'});    
    }
}

module.exports = {
    create,
    all,
    init
}