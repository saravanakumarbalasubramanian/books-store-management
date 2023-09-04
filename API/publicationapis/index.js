// initilize the Router through express to use microservices
const Router = require("express").Router();

// database
const database = require("../../database/publication");

//                api's

/* 
Route - /
Description - to get all publications
Access - PUBLIC
Parameter - NONE
Methods - GET
*/
Router.get("/", (req, res) => {
    return res.json({data: database.publications})
});


/* 
Route - /pub/:id
Description - to get specfic publications
Access - PUBLIC
Parameter - id
Methods - GET
*/
Router.get('/:id', (req, res) => {
    const pubDetails = database.publications;
    const getId = req.params.id;
    const getPubDetails = pubDetails.filter((data) => data.id === parseInt(getId))
    if(pubDetails.id !== getId){
        return res.json(`No Author match for this id ${getId}`)
    }
    return res.json({"publication details" : getPubDetails})
});


/* 
Route - /pub/books/:id
Description - to get list of publication based on books
Access - PUBLIC
Parameter - /id
Methods - GET
*/
Router.get('/pub/books/:id', (req, res) => {
    const getPubdet = database.publications.filter((data) => data.books.includes(req.params.id));
    if(database.publications.books !== req.params.id){
        return res.json(`No Publication are found based on this Books ${req.params.id}`);
    } 
    return res.json({"publication Details" : getPubdet});
});


/* 
Route - /publications/addnew
Description - add new publication 
Access - PUBLIC
Parameter - none
Methods - POST
*/
Router.post('/pub/addnew', (req, res) => {
    const {newPub} = req.body;
    database.publications.push(newPub);
    return res.json({newpublication: database.publications});
});


/* 
Route - /authors/publicationname/:id
Description - update publication name
Access - PUBLIC
Parameter - none
Methods - PUT
*/
Router.put('/authors/publicationname', (req, res) => {
    const {id} = req.body;
    const {newname} = req.body;
    database.publications.forEach((data) => {
        if(data.id === id){
            data.name = newname;
                 return ;
        } 
    });
           return res.json({publicationdetails : database.publications});
});


/* 
Route - /pub/books/add/new/:bookid/:pubid
Description - update/add a books to publications
Access - PUBLIC
Parameter - /:bookid/:pubid
Methods - PUT
*/
Router.put('/pub/books/add/new/:bookisbn/:pubid', (req, res) => {
 
    const bookIsbn = req.params.bookisbn;
    const pubId = req.params.pubid;

    database.publications.forEach((data) => {
        if(data.id === parseInt(pubId)){
            data.books.push(bookIsbn);
            return ;
        }

    })

    database.books.forEach((data) => {
        if(data.ISBN === bookIsbn){
            data.publication.push(pubId);
            return ;
        }
    });
    return res.json({details: database.books, data : database.publications});
});


/* 
Route - /delete/publication/d/p/:id
Description - delete a publication
Access - PUBLIC
Parameter - id
Methods - DELETE
*/
Router.delete('/delete/pub/d/p/:id', (req, res) => {
    const newPubList = database.publications.filter((data) => data.id !== parseInt(req.params.id));
    database.publications = newPubList;
    return res.json({publications : database.publications});
});


/* 
Route - /delete/book/publications/:pubid/:isbn
Description - delete a book 
Access - PUBLIC
Parameter - isbn/authorid
Methods - DELETE
*/
Router.delete('/delete/book/pub/:pubid/:isbn', (req, res) => {
// delete a book from publication books
    database.publications.forEach((data) => {
        if(data.id === parseInt(req.params.pubid)){
            const newPubBookDet = data.books.filter((book) => book !== req.params.isbn)
            data.books = newPubBookDet;
            return ;
        }
    });
// delete a publication form the book
    database.books.forEach((data) => {
        if(data.ISBN === req.params.isbn){
            data.publication = 0;
            return ;
        }
    });
         return res.json({publications: database.publications, books: database.books});
});

// export 

module.exports = Router;