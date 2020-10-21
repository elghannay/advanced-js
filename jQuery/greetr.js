// first create a new execution context for our library so our global variables are safe,
// and we are only exposing to the global object what we want.
(function (global, $) {
    const Greetr = function (name, lastName, language) {
        return new Greetr.init(name, lastName, language);
    };

    const supportedLanguages = ['en', 'es'];

    const greeting = {
        en: 'Hello',
        es: 'Hola',
    };

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

            // this refers to the calling object at execution time, and make 
            // the method chainable;
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
        }

    };

    Greetr.init = function (name, lastName, language) {
        let that = this;
        that.name = name || '';
        that.lastName = lastName || '';
        that.language = language || 'en';
    };

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G_ = Greetr;
})(window, jQuery);
