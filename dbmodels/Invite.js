var Mongoose = require('mongoose');

exports.InviteSchema = new Mongoose.Schema({
    'guests': { type : Array , "default" : [] }
});