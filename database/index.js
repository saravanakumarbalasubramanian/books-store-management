let books = [
    {
        ISBN: "12345books",
        title: "Miguel de Cervantes",
        publishData: "01/04/2003",
        languages: "tamil",
        numpages: 500,
        author: [1], // it is the id of the authors
        publication: [1],
        category: ["life", "studies", "focus"],
    },
    {
        ISBN: "9876books",
        title: "Clean Code",
        publishData: "01/04/2003",
        languages: "english",
        numpages: 1000,
        author: [1, 2], // it is the id of the authors
        publication: [1],
        category: ["life"],
    },

    {
        ISBN: "Lord of the Rings",
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
        name: "Penguin Random House",
        books: ["12345books", "9876books"]
    },
    {
        id: 3,
        name: "Aleph Book Company",
        books: ["9876books","5678jk"]
    },
    {
        id: 2,
        name: "Jaico Publishing House",
        books: ["9876books"]
    }
];

module.exports= {books,authors,publications};