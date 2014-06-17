exports.view = function (Invite, Guest) {
    return function(req, res){
        Invite.find({}, function(error, invites) {
            Guest.find({}, function(error, guests) {
                res.render('invites', {
                    'title':   'Invite List',
                    'guests' : guests,
                    'invites': invites
                });
            });
        });
    };
};

exports.addInvite = function(Invite) {
    return function(req, res) {
        var invite = new Invite(req.body);
        invite.save(function(error, invite){
            if (error || !invite) {
                res.json({'error': true});
            } else {
                res.json(invite);
            }
        });
    }
};


