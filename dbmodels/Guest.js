var Mongoose = require('mongoose');

exports.GuestSchema = new Mongoose.Schema({
    'firstName': { 'type': String, 'required': true },
    'lastName':  { 'type': String, 'required': true },
    'nicknames': { 'type': String, 'required': false},
    'address':   {
        'street1': { 'type': String, 'required': true },
        'street2': { 'type': String, 'required': false },
        'city':    { 'type': String, 'required': true },
        'state':   { 'type': String, 'required': true },
        'zip':     { 'type': Number, 'required': true }
    },
    'email':     { 'type': String, 'required': false },
    'phone':     { 'type': String, 'required': false },
    'confirmed': { 'type': Boolean, 'required': true, 'default': false }
});