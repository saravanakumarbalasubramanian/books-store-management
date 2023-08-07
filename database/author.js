const mongoose = require("mongoose");

// create a  schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

// convert to model 
const AuthorModel = mongoose.model(AuthorSchema);

// export 
module.exports = AuthorModel;