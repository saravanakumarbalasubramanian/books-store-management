// initilize the Router through router 
const Router = require("express").Router();


// database
const AuthorModel = require("../../database/author");


//                 api's
/* 
Route - /
Description - to get all author
Access - PUBLIC
Parameter - NONE
Methods - GET
*/
Router.get('/auth/all', async (req, res) => {
    // return res.json({data: database.authors})
    const allAuthors = await AuthorModel.find(); 
    return res.json({allAuthors});
 });
 
 
 /* 
 Route - /auth
 Description - to get specfic author
 Access - PUBLIC
 Parameter - authorid
 Methods - GET
 */
 Router.get('/auth/:authorid', (req, res) => {
     const authorData = database.authors;
     const specbook = req.params.authorid;
     const bookDetatils = authorData.filter((data) => data.id === parseInt(specbook));
     if(bookDetatils.length === 0 ){
         return res.json(`no book found for this book id ${specbook}`)
     }
     return res.json(bookDetatils);
 })
 
 
 /* 
 Route - /a
 Description - to get specfic author
 Access - PUBLIC
 Parameter - authorbook
 Methods - GET
 */
 Router.get('/a/:authorbook', (req, res) => {
     const authordata = database.authors;
     const booksid = req.params.authorbook;
     const getAuthor = authordata.filter((bookdata) => bookdata.books.includes(booksid));
     if(getAuthor.length === 0){
         return res.json(`There is no author based on this book ${booksid}`)
     }
     return res.json({"Author Details" : getAuthor });
 });
 
 
 /* 
 Route - /authors/addnew
 Description - add new author
 Access - PUBLIC
 Parameter - none
 Methods - POST
 */
 Router.post('/auth/addnew', async (req, res) => {
     const {newAuthor} = req.body;
     //database.authors.push(newAuthor);
     const addNewAuthor = AuthorModel.create(newAuthor);
     // AuthorModel.create(newAuthor); it is also possible if we give this we have to only get message in res.json
     // return res.json(message: "book was added");
     return res.json({newAuthors: addNewAuthor});
 });
 
 
 /* 
 Route - /authors/updatename/:id
 Description - update author name
 Access - PUBLIC
 Parameter - none
 Methods - PUT
 */
 Router.put('/auth/updatename/:id/:newname', (req, res) => {
     database.authors.forEach((data) => {
         if(data.id === parseInt(req.params.id)){
             data.name = req.params.newname;
             return
         }
     });
     return res.json({authorsdetails : database.authors});
 });
 
 
 /* 
 Route - /delete/author/d/a/:id
 Description - delete a author 
 Access - PUBLIC
 Parameter - id
 Methods - DELETE
 */
 Router.delete('/delete/auth/d/a/:id', (req, res) => {
     const newAuthorsList =    database.authors.filter((data) => data.id !== parseInt(req.params.id));
     database.authors = newAuthorsList;
     return res.json({authorsList : database.authors})
 });



 module.exports = Router;