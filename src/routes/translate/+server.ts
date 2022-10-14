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

const legal = ['a', 'z', '-', "'"].map((c) => c.charCodeAt(0));
const isLegal = (c: string | number) => {
	if (typeof c === 'string') c = c.charCodeAt(0);
	return (c >= legal[0] && c <= legal[1]) || legal.indexOf(c, 2) >= 0;
};
const splitMarks = (word: string): [string, string, string] => {
	let idx = -1;

	for (let i = 0; i < word.length; ++i) {
		let c = word.charCodeAt(i);

		if (!isLegal(c)) continue;

		let j = i + 1;
		for (; j < word.length + 1; ++j) {
			c = word.charCodeAt(j);

			if (!isLegal(c)) break;
		}

		return [word.slice(0, i), word.slice(i, j), word.slice(j)];
	}

	return [word, '', ''];
};

export const POST: RequestHandler = async ({ request }) => {
	const data: string = (await request.text()).trim();

	// Prelozeni
	let text = data
		.split(' ')
		.map((w) => {
			const [pre, word, suf] = splitMarks(w.toLowerCase());
			return pre + (dictionary[word] ?? word) + suf;
		})
		.join(' ');

	return json({ text });
};
