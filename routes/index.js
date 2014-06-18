/* GET home page. */
exports.root = function(req, res) {
    var defaultView = 'info';
    res.render(defaultView, {});
};

exports.info = function(req, res) {
    res.render('info', {
        'title': 'Information'
    });
};
exports.rsvp = function(req, res) {
    res.render('rsvp', {
        'title': 'RSVP'
    });
};
exports.vegas = function(req, res) {
    res.render('vegas', {
        'title': 'Vegas'
    });
};
exports.registry = function(req, res) {
    res.render('registry', {
        'title': 'Registry'
    });
};

exports.index = function (Guest) {
    return function(req, res){

        Guest.find({}, function(error, guests) {
            console.log(guests);
            res.render('index', {
                'title': 'Guest List',
                'guests' : guests,
                'blah': Guest
            });
        });
    };
};

exports.addGuest = function(Guest) {
    return function(req, res) {
        var guest = new Guest(req.body);
        guest.save(function(error, guest){
            if (error || !guest) {
                res.json({'error': true});
            } else {
                res.json(guest);
            }
        });
    }
};

exports.get = function(Guest) {
    return function(req, res) {
        Guest.find({}, function(error, guests){
            res.json(guests);
        });
    }
};

exports.update = function(Guest) {
    return function(req, res) {
        Guest.findOne({'_id': req.params.id }, function(error, guest){
            if (error || !guest) {
                res.json({'error': error});
            } else {
                for (var key in req.body) {
                    if (req.body.hasOwnProperty(key)) {
                        guest[key] = req.body[key];
                    }
                }
                guest.save(function(error, data){
                    if (error || !data) {
                        res.json({'error': error});
                    } else {
                        res.json(data);
                    }
                });
            }
        });
    }
};