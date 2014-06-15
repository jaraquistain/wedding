var AW_require = function (name, type){
    "use strict";
    var stringSprite = "scriptlink",
        _s_ = stringSprite.substring(0, 6),
        _l_ = stringSprite.substring(6),
        source = name,
        html = "";

    if (type === "css" || type === "js") {
            var s_pre, s_post;
        switch (type) {
            case 'css':
                    s_pre = "<" + _l_ + " rel='stylesheet' href='";
                    s_post = "'><\/" + _l_ + ">";
                break;

            case 'js':
                    s_pre = "<" + _s_ + " type='text/javascript' src='";
                    s_post = "'><\/" + _s_ + ">";
                break;

            default:
            // Don't do anything
        }

        var i = 0,
            l = source ? source.length : 0;
        for (i = 0; i < l; i++) {
            if (i == 0) {
                html = ""
            }
            html += s_pre + source[i] + s_post;
        }
        document.write(html);
    }
};