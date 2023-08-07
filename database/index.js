let books = [
    {
        ISBN: "12345books",
        title: "start with yourself",
        publishData: "01/04/2003",
        languages: "tamil",
        numpages: 500,
        author: [1], // it is the id of the authors
        publication: [1],
        category: ["life", "studies", "focus"],
    },
    {
        ISBN: "9876books",
        title: "how to make sex",
        publishData: "01/04/2003",
        languages: "english",
        numpages: 1000,
        author: [1, 2], // it is the id of the authors
        publication: [1],
        category: ["life", "sex"],
    },

    {
        ISBN: "5678jk",
        title: "how to make laugh",
        publishData: "01/04/2003",
        languages: "english",
        numpages: 1000,
        author: [1, 2, 3], // it is the id of the authors
        publication: [1],
        category: ["life", "therapy"],
    },
];

let authors = [
    {
   id: 1,
   name: "saravana",
   books: ["12345books"]
},
    {
   id: 2,
   name: "williams vignesh",
   books: ["9876books"]
},
    {
   id: 3,
   name: "pavan",
   books: ["9876books", "5678jk"]
},
];


let publications =[
    {
        id: 1,
        name: "thailex",
        books: ["12345books", "9876books"]
    },
    {
        id: 3,
        name: "pomex",
        books: ["9876books","5678jk"]
    },
    {
        id: 2,
        name: "Rolex",
        books: ["9876books"]
    }
];

module.exports= {books,authors,publications};