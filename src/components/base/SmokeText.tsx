import * as React from "react";

import * as generateClassName from "smokescreen/Cid";

import {
	generateStyleString,
	obfuscateString,
	generateRandomString,
} from "./utils";
import { StyleSheet } from "./utils";

export default ({ children }) => {
	const text: string = children.normalize("NFC");

	// Предупреждение 'item was found 2' (/м.*о.*с.*к.*в.*а/i.test(element.innerHTML))
	// будет возникать всегда, но не из-за SmokeText а из-за обычного текста. Например:
	// "мин. от м. Сходненская. Развитая инфраструктура. Индивидуа"

	// 1) Обфусцировать исходный текст, заменив кириллицу на английские омоглифы
	// 2) Разбить текст на части
	// 3) Каждую часть добавить в div и div::after
	// 4) Между частями контента добавить div с рандомными строками

	// Дополнительные способы максировки:
	// 1) Выводить текст в обратном порядке и в обратном направлении (unicode-bidi: bidi-override; direction: rtl;)
	// 2) Использовать вместо некоторых символов зеркальные омоглифы (напр. "И" и "N") и отзеркаливать их с помощью transform: scale(-1, 1)

	const splitText = (text: string): string[] => {
		const chars = Array.from(text);
		let chunks: string[] = [];
		const maxChunkSize = Math.floor(chars.length ** 0.5);

		let i = 0;
		while (i < chars.length) {
			const chunkSize = Math.ceil(Math.random() * maxChunkSize);
			const chunk = chars.slice(i, i + chunkSize).join("");
			chunks.push(chunk);
			i += chunkSize;
		}

		return chunks;
	};

	const obfuscatedText = obfuscateString(text);
	const sheet: StyleSheet = {};
	const elements = [];

	const textChunks = splitText(obfuscatedText);
	for (let i = 0; i < textChunks.length; ) {
		// Content div with ::after
		const className = generateClassName();
		sheet[`.${className}`] = {
			display: "inline",
		};

		elements.push(
			<div key={className} className={className}>
				{obfuscateString(textChunks[i++])}
			</div>
		);

		if (i < textChunks.length) {
			const chunk = textChunks[i++];
			sheet[`.${className}::after`] = {
				content: `"${obfuscateString(chunk)}"`,
			};
		}

		// Decoy div
		const decoyClassName = generateClassName();
		const maxDecoyLength = 3;
		const decoyContent = generateRandomString(maxDecoyLength);

		sheet[`.${decoyClassName}`] = {
			display: "none",
		};

		elements.push(
			<div key={decoyClassName} className={decoyClassName}>
				{decoyContent}
			</div>
		);
	}

	const wrapperClassName = generateClassName();
	sheet[`.${wrapperClassName}`] = {
		display: "inline",
	};

	return (
		<div className={wrapperClassName}>
			<style>{generateStyleString(sheet)}</style>
			{elements}
		</div>
	);
};
