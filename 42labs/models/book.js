    var mongoose = require ('mongoose');
    var Schema = mongoose.Schema;
    
   
    
    var book = new Schema({
        BookName: {type: String, required: true },
        Rating: {type: Number, required: true },
        Classification: {type: String, required: true},
        Author: {type: String, required: true}},
        {timestamps: true});
            
    var bookstore = mongoose.model('store',book);
    
    module.exports = bookstore;