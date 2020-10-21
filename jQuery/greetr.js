// first create a new execution context for our library so our global variables are safe,
// and we are only exposing to the global object what we want.
(function (global, $) {

    const Greetr = function (name, lastName, language) {
        // return an object without using new
        return new Greetr.init(name, lastName, language);
    };

    // hidden within the scope of the IIFE and never directly accessible.
    const supportedLanguages = ['en', 'es'];

    // informal greeting
    const greeting = {
        en: 'Hello',
        es: 'Hola',
    };

    // formal greeting
    const formalGreeting = {
        en: 'greetings',
        es: 'saludos',
    };


    const logMessages = {
        en: 'logged in',
        es: 'inicio session'
    }

    Greetr.prototype = {

        fullName() {
            return `${this.name} ${this.lastName}`
        },

        // check that is valid language and reference the externally inaccessible 'supportedLanguages' 
        // within the closure
        validate() {
            if (-1 === supportedLanguages.indexOf(this.language))
                throw "this is **NOT** a supported language"
        },

        greeting() {
            return `${greeting[this.language]}  ${this.name} !`
        },

        formalGreeting() {
            return `${formalGreeting[this.language]} ${this.fullName()}`
        },

        greet(formal) {
            let msg;

            if (formal)
                msg = this.formalGreeting();
            else
                msg = this.greeting();

            if (console)
                console.log(msg);

            // this refers to the calling object at execution time,  
            //  make the method chainable;
            return this;
        },

        log() {
            if (console)
                console.log(`${logMessages[this.language]}: ${this.fullName()}`);
            return this;
        },

        setLang(lang) {
            this.language = lang;
            this.validate();
            return this;
        },

        HTMLGreeting(selector, formal) {
            if (!$)
                throw 'jquery is not loaded'
            if (!selector)
                throw 'please use a jquery selector'
            let msg;
            if (formal)
                msg = this.formalGreeting();
            else
                msg = this.greeting();
            // inject the message in the chosen place in the DOM
            $(selector).html(msg)

            return this;
        }

    };

    // the actual object is created here, allowing us to 'new' without having to call 'new'
    Greetr.init = function (name, lastName, language) {
        let that = this;
        that.name = name || '';
        that.lastName = lastName || '';
        that.language = language || 'en';
    };

    // trick borrowed from jquery so we don't have to use new
    Greetr.init.prototype = Greetr.prototype;
    // attach greetr to the global object, and provide a shorthand '$G'
    global.Greetr = global.G_ = Greetr;
})(window, jQuery);

