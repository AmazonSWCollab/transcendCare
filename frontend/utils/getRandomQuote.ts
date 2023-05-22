import quotes from "./quotes.json";

const CACHE_KEY = "randomQuote";
const CACHE_EXPIRATION_KEY = "quoteExpiration";

interface Quote {
  text: string;
}

function getRandomQuote(): Quote {
  let affirmations = quotes.affirmations;
  const now = new Date().getTime();

  // Check if a quote is cached and not expired
  const cachedQuote = localStorage.getItem(CACHE_KEY);
  const expirationTime = localStorage.getItem(CACHE_EXPIRATION_KEY);

  if (cachedQuote && expirationTime && now < Number(expirationTime)) {
    return JSON.parse(cachedQuote);
  }

  // Generate a new random quote
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  const newQuote: Quote = { text: affirmations[randomIndex] };

  // Cache the new quote and set the expiration time to 24 hours from now
  localStorage.setItem(CACHE_KEY, JSON.stringify(newQuote));
  localStorage.setItem(CACHE_EXPIRATION_KEY, String(now + 24 * 60 * 60 * 1000));

  return newQuote;
}

export default getRandomQuote;
