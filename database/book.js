const mongoose = require("mongoose");

// create a  schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
    },
    title: {
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
    },
    publishData: String,
    languages: String,
    numpages: {
        type:String,
        required:true,
        minlength: 1,
        maxlength:20,
        trim:true,
    },
    author: [Number], // it is the id of the authors
    publication: [Number],
    category: [String],
});

// convert to model 
const BookModel = mongoose.model("books",BookSchema);

// export 
module.exports = BookModel;