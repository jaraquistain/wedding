var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title:  'Guests',
        guests: [
            {
                'firstName': 'Jon',
                'lastName':  'Araquistain',
                'address':   {
                    'street1': '255 King Street',
                    'street2': '#422',
                    'city':    'San Francisco',
                    'state':   'CA',
                    'zip':     94580
                },
                'email':     'j.araquistain@gmail.com',
                'phone':     5107544722,
                'confirmed': false
            },
            {
                'firstName': 'Jon2',
                'lastName':  'Araquistain2',
                'address':   {
                    'street1': '255 King Street',
                    'street2': '#422',
                    'city':    'San Francisco',
                    'state':   'CA',
                    'zip':     94580
                },
                'email':     'j.araquistain@gmail.com',
                'phone':     5107544722,
                'confirmed': true
            },
            {
                'firstName': 'Jon3',
                'lastName':  'Araquistain3',
                'address':   {
                    'street1': '255 King Street',
                    'street2': '#422',
                    'city':    'San Francisco',
                    'state':   'CA',
                    'zip':     94580
                },
                'email':     'j.araquistain@gmail.com',
                'phone':     5107544722,
                'confirmed': false
            }
        ]
    });
});

module.exports = router;
