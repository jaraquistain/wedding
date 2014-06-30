exports.view = function (Invite, Guest) {
    return function (req, res) {
        Invite.find({}, function (error, invites) {
            Guest.find({}, function (error, guests) {
                res.render('invites', {
                    'title':   'Invite List',
                    'guests':  guests,
                    'invites': invites
                });
            });
        });
    };
};

exports.viewOne = function (Invite, Guest) {
    return function (req, res) {
        Guest.find({}, function (error, guests) {
            Invite.findOne({'_id': req.params.id }, function (error, invite) {
                res.render('invite', {
                    'title':  'Invite',
                    'invites': invite,
                    'guests': guests
                });
            });
        });
    };
};

exports.remove = function (Invite) {
    return function (req, res) {
        Invite.findOne({'_id': req.params.id }, function (error, invite) {
            if (error || !invite) {
                res.json({'error': error});
            } else {
                invite.remove(function (error, data) {
                    if (error || !data) {
                        res.json({'error': error});
                    } else {
                        res.json({'success': true});
                    }
                });
            }
        });
    }
};

exports.update = function (Invite) {
    return function (req, res) {
        Invite.findOne({'_id': req.params.id }, function (error, invite) {
            if (error || !invite) {
                res.json({'error': error});
            } else {
                invite.guests = req.body.guests;
                invite.submitted = req.body.submitted || false;
                invite.save(function (error, data) {
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

exports.get = function (Invite) {
    return function (req, res) {
        Invite.find({}, function (error, invites) {
            res.json(invites);
        });
    }
};

exports.add = function (Invite) {
    return function (req, res) {
        var invite = new Invite(req.body);
        invite.save(function (error, invite) {
            if (error || !invite) {
                res.json({'error': true});
            } else {
                res.json(invite);
            }
        });
    }
};


