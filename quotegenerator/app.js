const container = document.querySelector('.container');
const quoteContent = document.querySelector('.quote-content');
const tweetBtn = document.querySelector('.twitter');
const newQuoteBtn = document.querySelector('.newQuote');
const author = document.querySelector('.author');
const loader = document.querySelector('.loader');

function loadingStart() {
    loader.hidden = false;
    container.hidden = true;
}

function loadingComplete() {
    if (!loader.hidden) {
        container.hidden = false;
        loader.hidden = true;
    }
}
// added proxy to overcome CORS problems that come up when using free api  
// and limit the access control allow origin, for a detail of the problem visit
// https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9#:~:text=Why%20was%20the%20CORS%20error,%3A%20cross%2Dsite%20request%20forgery.
// also may need to implement one and host it yourself to escape crowded proxy servers
// https://github.com/Rob--W/cors-anywhere
const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

async function getQuote() {


    try {
        loadingStart();
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json(response);

        // Reduce font size for long quotes
        if (data.quoteText.length > 80) {
            quoteContent.classList.add('long-quote');
        } else {
            quoteContent.classList.remove('long-quote');
        }
        quoteContent.innerText = data.quoteText;
        author.innerText = `~ ${data.quoteAuthor} ~`;
        loadingComplete();
    } catch (error) {
        getQuote();
    }
}

const tweet = function () {
    const quote = quoteContent.innerText;
    const authorText = author.innerText;
    // adding a text parameter to the link see docs:  
    // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authorText}`;
    window.open(twitterUrl, '_blank');
}


newQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweet);

getQuote();