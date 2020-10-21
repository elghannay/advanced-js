// first create a new execution context for our library so our global variables are safe,
// and we are only exposing to the global object what we want.
(function (global, $) {

    const Greetr = function (name, lastName, language) {
        return new Greetr.init(name, lastName, language)
    }

    Greetr.prototype = {};

    Greetr.init = function (name, lastName, language) {
        let that = this;
        that.name = name || '';
        that.lastName = lastName || '';
        that.language = language || 'en';
    }

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G_ = Greetr;


})(window, jQuery)