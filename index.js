
{// how to use express
// 1st require express

// const express = require("express");

// // 2nd we have to  start the express 
// const vercues = express(); // starting the express 

// // 3rd we have to tell the express to understand the json format data because we are always using json format data 

// vercues.use(express.json());


// //  http requests 
// // GET
// // POST 
// // PUT
// // DELETE

// // 1st GET method
// vercues.get('/', (request, response) =>  {
//     return response.json("Hello Traders");
// });

// vercues.get('/home', (req, res) => {
//     return res.json("welcome to home page");
// });


// const stuDb = [
//     {
//          id: 1,
//          name:"saravana kumar b",
//          course: "b.tech",
//     },
//     {
//          id: 2,
//          name:"sasi kumar r",
//          course: "b.tech",
//     },
//     {
//          id: 3,
//          name:"sharan m",
//          course: "b.tech",
//     },
//     {
//          id: 4,
//          name:"sharath chandran p",
//          course: "b.tech",
//     },
//     {
//          id: 5,
//          name:"suresh",
//          course: "b.tech",
//     },
// ];
// vercues.get('/students/:id' , (req, res) => {
 
//     const stdId = req.params.id;
//     const stData = stuDb.filter((iddata) => iddata.id === parseInt(stdId));

//     if(stData.length === 0 ) {
//         return res.json("{No such Student found !}");
//     };

//     return res.json({"data" : stData});
// })




// // 4th  we have to initilaze the server 

// vercues.listen(5000, () => console.log("Server is Started 🚀 "));

}
// dotenv registration 
require("dotenv").config();
// what is used to create a server 
// express is used to create a server 
// to use express 1st require express form node
const express = require("express");
//2nd after required the express use the express
const threads = express();
// 3rd after using the express we have to tell the express to learn the json becouse we are sending and receiving the data in json format 
threads.use(express.json());
// getting the database data 
const database = require("./database/index");


// mongoose 
const mongoose = require("mongoose");
// establish the connection to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connection established"));
//-------------------------------------------------------books--------------------------------------------------------------------------------------------

/* 
Route - /
Description - to get all book
Access - PUBLIC
Parameter - NONE
Methods - GET
*/
threads.get('/books', (req, res) =>{
    return res.json({data : database.books})
});


/* 
Route - /
Description - to get specfic book based on isbn
Access - PUBLIC
Parameter - isbn
Methods - GET
*/
threads.get('/:isbn', (req, res) => {
    const id = req.params.isbn;
    const books = database.books;
   const getSpecificBook = books.filter((book) => book.ISBN === id);

   if(getSpecificBook.length  === 0 ){
    return res.json(`error : dei makku kuthi inga oru puthagamum ella for this isbn ${id}`);
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
threads.get('/c/:category', (req, res) => {
    const category = req.params.category;
    const getBooks = database.books;
    const getCategory = getBooks.filter((booksdata) => booksdata.category.includes(category));
    
    if(getCategory.length === 0){
        return res.json(" error :intha category la oruu pulum ella")
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
threads.get('/lang/:lang', (req, res) => {
    const getBooks = database.books.filter((books) => books.languages === req.params.lang);
    if(getBooks.length === 0) {
        return res.json("intha language la oru book uhh ell ")
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
threads.post('/books/addnew', (req, res) => {
   // const newBook = req.body.newBook;
   const {newBook} = req.body; // both are same it is called destructre method 
   database.books.push(newBook);
   return res.json({books: database.books});
});


/* 
Route - /book/update/title/:isbn
Description - update book title 
Access - PUBLIC
Parameter - isbn
Methods - PUT
*/
threads.put('/book/update/title/:isbn', (req, res) => {
    database.books.forEach((data) => {
        if(data.ISBN === req.params.isbn){
            data.title = req.body.newtitle;
            return;
        }
    })
    return res.json({books : database.books})
});


/* 
Route - /book/author/:isbn/:authorid
Description - update book author and the author book with the same book 
Access - PUBLIC
Parameter - isbn
Methods - PUT
*/
threads.put('/book/author/:isbn/:authorid', (req, res) => {
    const bookIsbn = req.params.isbn;
    const authorId = req.params.authorid;
    
    database.books.forEach((data) => {
        if(data.ISBN === bookIsbn){
            data.author.push(parseInt(authorId))
            return ;
        };

    })

    database.authors.forEach((data) => {
       if(data.id === parseInt(authorId)){
        data.books.push(bookIsbn);
        return;
       }
    });
    return res.json({bookdetails: database.books, authordetails: database.authors});
    
});


/* 
Route - /delete/book/:isbn
Description - delete a book 
Access - PUBLIC
Parameter - isbn
Methods - DELETE
*/
threads.delete('/delete/book/:isbn', (req, res) => {
  const updatedBooks =   database.books.filter(
    (data) => data.ISBN !== req.params.isbn
    );
    database.books= updatedBooks;
   return res.json({data: database.books})
});


/* 
Route - /delete/book/:authorid/:isbn
Description - delete a book 
Access - PUBLIC
Parameter - isbn/authorid
Methods - DELETE
*/
threads.delete('/delete/book/d/b/:authorid/:isbn', (req, res) => {
    // to delete a author from the book database
    database.books.forEach((data) => {
        if(data.ISBN === req.params.isbn){
            const newAuthorList = data.author.filter((data) => data  !== parseInt(req.params.authorid));
           data.author = newAuthorList;
            return ;
        }
    });
   // to delete a book form the author database
   database.authors.forEach((data) => {
     if(data.id === parseInt(req.params.authorid)){
        const newbookRemoved = data.books.filter((data) =>data !== req.params.isbn);
        data.books = newbookRemoved;
        return ;
     }
   });
   return res.json({ message: "The author was deleted from the book", books: database.books, authors : database.authors})
});



//---------------------------------------------------Authors----------------------------------------------------------------------------------------------

/* 
Route - /
Description - to get all author
Access - PUBLIC
Parameter - NONE
Methods - GET
*/
threads.get('/authors/all', (req, res) => {
    return res.json({data: database.authors})
});


/* 
Route - /auth
Description - to get specfic author
Access - PUBLIC
Parameter - authorid
Methods - GET
*/
threads.get('/auth/:authorid', (req, res) => {
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
threads.get('/a/:authorbook', (req, res) => {
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
threads.post('/authors/addnew', (req, res) => {
    const {newAuthor} = req.body;
    database.authors.push(newAuthor);
    return res.json({newAuthors: database.authors});
});


/* 
Route - /authors/updatename/:id
Description - update author name
Access - PUBLIC
Parameter - none
Methods - PUT
*/
threads.put('/authors/updatename/:id/:newname', (req, res) => {
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
threads.delete('/delete/author/d/a/:id', (req, res) => {
    const newAuthorsList =    database.authors.filter((data) => data.id !== parseInt(req.params.id));
    database.authors = newAuthorsList;
    return res.json({authorsList : database.authors})
})
// ------------------------------------------------publications-----------------------------------------------------------------------------------------

/* 
Route - /
Description - to get all publications
Access - PUBLIC
Parameter - NONE
Methods - GET
*/
threads.get("/publications", (req, res) => {
    return res.json({data: database.publications})
});


/* 
Route - /pub/:id
Description - to get specfic publications
Access - PUBLIC
Parameter - id
Methods - GET
*/
threads.get('/pub/:id', (req, res) => {
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
threads.get('/pub/books/:id', (req, res) => {
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
threads.post('/publications/addnew', (req, res) => {
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
threads.put('/authors/publicationname', (req, res) => {
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
threads.put('/pub/books/add/new/:bookisbn/:pubid', (req, res) => {
 
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
threads.delete('/delete/publication/d/p/:id', (req, res) => {
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
threads.delete('/delete/book/publications/:pubid/:isbn', (req, res) => {
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
})
























// 4th step and the last step is to create the server 
threads.listen(9999, () => console.log("The Server is Started 🚀"));