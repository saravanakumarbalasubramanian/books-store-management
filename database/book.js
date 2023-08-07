const mongoose = require("mongoose");

// create a  schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    publishData: String,
    languages: String,
    numpages: Number,
    author: [Number], // it is the id of the authors
    publication: [Number],
    category: [String],
});

// convert to model 
const BookModel = mongoose.model(BookSchema);

// export 
module.exports = BookModel;