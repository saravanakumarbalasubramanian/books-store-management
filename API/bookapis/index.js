// initilize the microservices through express
// as we know the microservices provide prefix to use that 

// first import router from express -> router is a function
const Router = require("express").Router();

// database
const BookModel = require("../../database/book");


//2nd step =>  after import the router copy paste the book api's

// 3rd step => replace the Router into Router

/*Route - /
Description - to get all book
Access - PUBLIC
Parameter - NONE
Methods - GET
*/
// this api is for the database that we created in index.js file
// Router.get('/books', (req, res) =>{
//     return res.json({data : database.books})
// });

// this api is for get all books form out mongodb
Router.get('/', async (req, res) =>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/* 
Route - /
Description - to get specfic book based on isbn
Access - PUBLIC
Parameter - isbn
Methods - GET
*/
Router.get('/:isbn', async (req, res) => {
    const id = req.params.isbn;
//     const books = database.books;
//    const getSpecificBook = books.filter((book) => book.ISBN === id);
 const getSpecificBook = await BookModel.findOne({ISBN : req.params.isbn});
   if(!getSpecificBook){
    return res.json(`error : No book found for this isbn ${id}`);
   };

   return res.json(getSpecificBook);
});

/* 
Route - /books
Description - to get specfic book based on category
Access - PUBLIC
Parameter - category
Methods - GET
*/
Router.get('/c/:category', async (req, res) => {
    const category = req.params.category;
    // const getBooks = database.books;
    // const getCategory = getBooks.filter((booksdata) => booksdata.category.includes(category));
    const getCategory = await BookModel.findOne({category: req.params.category});
    if(!getCategory){
        return res.json(` error : error for this  category ${category} `)
    }
    return res.json({details : getCategory})
})


/* 
Route - /lang
Description - to get specfic book based on languages
Access - PUBLIC
Parameter - lang
Methods - GET
*/
Router.get('/lang/:lang', (req, res) => {
    const getBooks = database.books.filter((books) => books.languages === req.params.lang);
    if(getBooks.length === 0) {
        return res.json("No Book found based on this language")
    };

    return res.json({books : getBooks})
})


/* 
Route - /books/addnew
Description - add new book
Access - PUBLIC
Parameter - none
Methods - POST
*/
Router.post('/addnew', async (req, res) => {
//    // const newBook = req.body.newBook;
//    const {newBook} = req.body; // both are same it is called destructre method 
//   // database.books.push(newBook);
//    const addNewBook = await BookModel.create(newBook); 
//   return res.json({books: addNewBook});

  // validate by mongoose 
  try{
    const {newBook} = req.body;
    const addNewBook = await BookModel.create(newBook); 
    return res.json({books: addNewBook});
  }catch(error){
    return res.json({error: error.message});
  };
});


/* 
Route - /book/update/title/:isbn
Description - update book title 
Access - PUBLIC
Parameter - isbn
Methods - PUT
*/
Router.put('/update/title/:isbn', async (req, res) => {
    // database.books.forEach((data) => {
    //     if(data.ISBN === req.params.isbn){
    //         data.title = req.body.newtitle;
    //         return;
    //     }
    // });

    // in mongodb form 
    const updatedBookTitle = await BookModel.findOneAndUpdate(
        { // to find the book with isbn
            ISBN : req.params.isbn,
        },
        { // after finding the book update the book title
            title: req.body.newTitle,
        },
        { // after updated the title => get the whole book with updated book title to achive that use new:true,
            new: true,
        },
        );
    return res.json({books : updatedBookTitle})
});


/* 
Route - /book/author/:isbn/:authorid
Description - update book author and the author book with the same book 
Access - PUBLIC
Parameter - isbn
Methods - PUT
*/
Router.put('/author/:isbn/:authorid', async (req, res) => {
    const bookIsbn = req.params.isbn;
    const authorId = req.params.authorid;
    
    // database.books.forEach((data) => {
    //     if(data.ISBN === bookIsbn){
    //         data.author.push(parseInt(authorId))
    //         return ;
    //     };

    // })
     const updateBookAuthor = await BookModel.findOneAndUpdate(
        {
              ISBN: bookIsbn,
        },
        {
            $push: {
                author : authorId,
            },
        },
        {
            new : true
        },
     );
    // database.authors.forEach((data) => {
    //    if(data.id === parseInt(authorId)){
    //     data.books.push(bookIsbn);
    //     return;
    //    }
    // });
    const updateAuthorBookIsbn = await AuthorModel.findOneAndUpdate(
        {
            id : authorId,
        },
        {
            $push : {
                books: bookIsbn,
            }
        },
        {
            new: true
        },
    )
    return res.json({bookdetails: updateBookAuthor, authordetails: updateAuthorBookIsbn, message: "added successfully"});
    
});


/* 
Route - /delete/book/:isbn
Description - delete a book 
Access - PUBLIC
Parameter - isbn
Methods - DELETE
*/
Router.delete('/delete/bok/:isbn', async (req, res) => {
//   const updatedBooks =   database.books.filter(
//     (data) => data.ISBN !== req.params.isbn
//     );
//     database.books= updatedBooks;
     const updatedBooks = await BookModel.findOneAndDelete({
        ISBN : req.params.isbn,
     });
   return res.json({data: updatedBooks})
});


/* 
Route - /delete/book/:authorid/:isbn
Description - delete a book from author database and delete a author form book database
Access - PUBLIC
Parameter - isbn/authorid
Methods - DELETE
*/
Router.delete('/delete/bok/d/b/:authorid/:isbn', async (req, res) => {
    // to delete a author from the book database
    // database.books.forEach((data) => {
    //     if(data.ISBN === req.params.isbn){
    //         const newAuthorList = data.author.filter((data) => data  !== parseInt(req.params.authorid));
    //        data.author = newAuthorList;
    //         return ;
    //     }
    // });

    const updateBookAuthor = await BookModel.findOneAndUpdate(
        {
      ISBN: req.params.isbn,
    },
    {
      $pull: {
        author: parseInt(req.params.authorid),
      },
    },
    {new: true},
    );
   // to delete a book form the author database
//    database.authors.forEach((data) => {
//      if(data.id === parseInt(req.params.authorid)){
//         const newbookRemoved = data.books.filter((data) =>data !== req.params.isbn);
//         data.books = newbookRemoved;
//         return ;
//      }
//    });

   const updateAuthorBooks = await AuthorModel.findOneAndUpdate(
    {
     id: parseInt(req.params.authorid), 
   },
   {
    $pull: {
        books: req.params.isbn,
    }
   },
   {new:true}
   );
   return res.json({ message: "The author was deleted from the book", books: updateBookAuthor, authors : updateAuthorBooks});
});



// atlast export the file 
module.exports = Router;

// initilize the prefix for all api's above  in main file 