
//_AW_GLOBAL gets set to the window object on browsers, and the global context if no window is present.
AW_GLOBAL =  (typeof AW_GLOBAL === "undefined") ? (function(w) {return w}(this)):AW_GLOBAL;
AW_GLOBAL.AW = ({
    /*************************************************************************
     * Declares a namespace, given a namespace name as an argument
     * Modelled after YUI namespace declaration
     *
     * The Convention is that Namespaces are UPPERCASE or TitleCase but not
     * lowercase.
     *
     * The format of any Javascript file(namespace) should be as shown below.
     *
     * Format 1:
     * ---------
     * This first example assumes that your code has public as well as private members.
     *
     * AW.namespace("AW.x.y");
     * function($){
     *    var privateVariable = ...;
     *    $.publicFunction = function(){
     *    }
     *    $.publicVariable = 12345;
     * }(AW.x.y);
     *
     * Format 2:
     * ---------
     * If your Namespace Does not have private members,
     * (or does not include any complex interdependent expressions) just
     * declare your members in a simple way, as follows.
     *
     * AW.namespace("AW.x.y");
     * AW.x.y.publicFunction = function(){
     *   .....
     * }
     *
     * @param list of namespaces to be created
     * @returns {null}
     ***************************************************************************/
    "namespace": function (list) {
        "use strict";
        var a = arguments;
        for (var i = 0; i < a.length; i = i + 1) {
            // console.log("AW.namespace defining: "+a[i]);
            var d = a[i].split(".");
            var o = AW;
            var s = (d[0] === "AW") ? 1 : 0;
            var n = "AW";
            for (var j = s; j < d.length; j = j + 1) {
                n = n + "." + d[j];
                o[d[j]] = o[d[j]] ||
                /**
                 * This is the real definition of a namespaced object
                 */
                    (function (ns) {
                        var _parent; //parent of the name space
                        var _nsName = n; //name space name
                        ns.extend = AW.extend;
                        ns.setParent = function (p) {
                            _parent = p;
                        };
                        ns.getNSName = function () {
                            return _nsName;
                        };
                        ns.toString = function () {
                            return _nsName;
                        };
                        ns.isNamespace = true;
                        /**
                         * Returns ths parent if no arguments are passed
                         * Else, returns property from parent.
                         *
                         * Some interpreters do not like "parent"
                         * @param propertyName
                         * @returns {*}
                         */
                        ns.parent = function (propertyName) {
                            if (propertyName) {
                                return _parent[propertyName];
                            }
                            return _parent;
                        };
                        ns.catchAll = AW.catchAll;
                        return ns;
                    })({});
                o[d[j]].setParent(o);
                o = o[d[j]];
            }
        }
        return o;
    },
    /*************************************************************************
     * Recursively deep copies properties from parent to child,
     * while following rules of classical inheritance
     * The "extend" function also sets up access to the parent
     * via use of
     *
     *  parent() // returns the parent object
     *  parent(propertyName) //essentially returns parent()[propertyName]
     *
     * So e.g. if the child class has a method called methodX() and the parent has the same method
     * and within methodX, you want to call the parent's function.
     *
     * ns.methodX = function( arg1, arg2) {
     *          this.base(arg1,arg2)
     * }
     *
     *  [[ NOTE ]]   if you wish to use the "base()" function,s make sure that "extend" is called
     *              AFTER the object is created.
     *  (function(ns){
     *         ns.x = function(o){
     *             this.base(o);
     *         }
     *   })("child");
     *  child.extend(parent); //Its critical that "extends" is aware of "parent.x"
     *
     *
     * @param c  The child object
     * @param p  The parent object
     * @param o if true, forces the methods to be copied from parent to child, ignoring the rules of classical inheritance
     * @returns {*}
     *************************************************************************/
    "extend":    function (c, p, o) {
        "use strict";
        var _BASE_ = 'base';
        var override = false;
        var child;
        var parent;
        //figure out what the parent and child objects are..
        //if the child is not specified.. then child is "this"
        if (arguments.length > 2) {
            child = c;
            parent = p;
            override = ((typeof arguments[2]) === "boolean") ? o : override;
        }
        if (arguments.length == 2) {
            if ((typeof arguments[1]) === "boolean") {
                child = this;
                parent = c;
                override = p;
            } else {
                child = c;
                parent = p;
            }
        }
        if (arguments.length == 1) {
            child = this;
            parent = c;
        }
        if (!child || !parent) {
            throw new Error("Insufficient arguments for extend");
        }
        if (!(typeof child === "object") || !(typeof parent === "object")) {
            console.warn("Both child and parent must be objects, naughty, naughty");
            return child;
        }
        if (child === parent) {
            console.warn("Child and parent are the same, naughty, naughty");
            return;
        }

        //All error conditions have been checked.
        //Now for the fun part
        var property;
        for (property in parent) {
            if (property in child && parent.hasOwnProperty(property)) {
                var to, from;
                if (override) {
                    // OVERRIDE IS VERY DANGEROUS
                    // It Wipes Out everything
                    // And it goes deep
                    to = child[property];
                    from = parent[property];
                    var temp;
                    if (Array.isArray(from)) {
                        temp = (to && Array.isArray(to)) ? to : [];
                        child[property] = e(temp, from, override);
                    } else if (typeof from === "object") {
                        temp = (to && ((typeof to) === "object")) ? to : {};
                        child[property] = e(temp, from, override);
                    } else {
                        child[property] = parent[property];
                    }
                } else {
                    //OK, so the property exists in both parent and child
                    //"override" is false..so usually the child's property will take precedence.
                    to = child[property];
                    from = parent[property];
                    if ((typeof to === "function") && (typeof from === "function")) {
                        if (Object.keys(AW).indexOf(property) === -1) {
                            //But if the property is a function, the child needs to have a way of calling the parent
                            //we setup a closure, and a function called "base" that can be used to call the parent.
                            var assignBase = function (t, f) {
                                // if the child function calls base(), they will in essence be calling the parent's function
                                return function () {
                                    var temp = this[_BASE_] ? this[_BASE_] : undefined;
                                    this[_BASE_] = f;
                                    var result = t.apply(this, arguments);
                                    if (temp) {
                                        this[_BASE_] = temp;
                                    }
                                    return result;
                                };
                            };
                            child[property] = assignBase(to, from);
                        }
                    }
                }
            } else {
                //kill circular references
                if (!(child === parent[property]) && !(typeof parent[property] === "object" && parent[property].isNamespace)) {
                    child[property] = parent[property];
                }
            }
        }
        if (child.setParent) {
            child.setParent(parent);
        }
        return child;
    },
    //Manually declare the other functions
    "setParent": function () {
        //This basically gets ignored
        //Parent of AWis AW_GLOBAL.
    },
    "isNamespace": true,
    "getNSName": function () {
        return "AW";
    },
    "toString": function () {
        return "AW";
    },
    "parent": function (propertyName) {
        return propertyName?AW_GLOBAL[propertyName]:AW_GLOBAL;
    },
    /**************************************************************************
     * Public function to wrap the namespace functions in a try/catch
     * Use with 3rd party (Livefyre, GA, etc).
     *************************************************************************/
    "catchAll": function (namespace) {
        namespace = namespace || this;

        var parent = namespace.parent ? namespace.parent() : AW;
        var keys = Object.keys(namespace);

        keys.forEach(function (key) {
            if (typeof namespace[key] === 'function' && !parent[key]) {
                var old = namespace[key];
                namespace[key] = function () {
                    try {
                        return old.apply(this, arguments);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        });
    }
}).extend(AW_GLOBAL.AW||{});
