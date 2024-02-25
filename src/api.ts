import { ALLOWED_GUESSES } from './allowed_guesses';
import { ALLOWED_WORDS } from './allowed_words';

export const getWord = () =>
	ALLOWED_WORDS[Math.floor(Math.random() * ALLOWED_WORDS.length)];

export const isAllowedGuess = (guess: string) => ALLOWED_GUESSES.includes(guess);
