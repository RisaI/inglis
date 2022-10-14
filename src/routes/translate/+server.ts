import { json } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import type { RequestHandler } from './$types';
import { CMUSyllableMap } from './cmu';

const [fromChar, toChar] = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];

const dictionary: { [key: string]: string } = {
	hi: 'háj'
};

const allSyllables = new Set();

readFileSync('cmudict.txt')
	.toString()
	.split('\n')
	.forEach((line) => {
		const firstCode = line.charCodeAt(0);
		if (firstCode < fromChar || firstCode > toChar) return;

		let [key, ...syllables] = line
			.split(' ')
			.filter(Boolean)
			.map((s) => s.toLowerCase().trim());

		if (key in dictionary) return;

		dictionary[key] = syllables.map((s) => CMUSyllableMap[s] ?? s).join('');
		syllables.forEach((s) => allSyllables.add(s));
	});

console.log([...allSyllables]);

export const POST: RequestHandler = async ({ request }) => {
	const data: string = await request.text();

	// Prelozeni
	let text = data
		.split(' ')
		.map((word) => dictionary[word.toLowerCase()] ?? word)
		.join(' ');

	return json({ text });
};
