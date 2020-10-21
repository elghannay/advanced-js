// get a new object, the architecture allow us to not have to use the 'new' keyword 
const test = G_('mohamed', 'elghannay', 'en')
test.greet().greet(true).setLang('es').greet(true)

const heading = $('#heading');
const lang = document.getElementById('select').value;
test.setLang(lang).greet(true).HTMLGreeting(heading, true)