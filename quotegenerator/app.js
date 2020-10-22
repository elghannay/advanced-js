const container = document.querySelector('.container');
const quoteContent = document.querySelector('.quote-content');
const tweetBtn = document.querySelector('.twitter');
const newQuoteBtn = document.querySelector('.newQuote');
const author = document.querySelector('.author');
const loader = document.querySelector('.loader');
loader.hidden = true;

function loadingStart() {
    loader.hidden = false;
    container.hidden = true;
}

function loadingComplete() {
    loader.hidden = true;
    container.hidden = false;
}

const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

async function getQuote() {

    loadingStart();

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json(response);
        quoteContent.innerText = data.quoteText;
        author.innerText = data.quoteAuthor;
        loadingComplete();
        // console.log(data);
    } catch (error) {
        // console.log(error);
        getQuote();
    }
}

const tweet = function () {
    const quote = quoteContent.innerText;
    const authorText = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authorText}`;
    window.open(twitterUrl, '_blank');
}


newQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweet);

getQuote();