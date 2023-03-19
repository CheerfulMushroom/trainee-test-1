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
	// 3) Каждую часть добавить в span::after. Внутрь каждого span добавить невидимые рандомные строки

	// Дополнительные способы:
	// 1) Выводить текст в обратном порядке и в обратном направлении (unicode-bidi: bidi-override; direction: rtl;)
	// 2) Использовать вместо некоторых символов зеркальные омоглифы (напр. "И" и "N") и отзеркаливать их с помощью transform: scale(-1, 1)

	const splitText = (text: string): string[] => {
		const chars = Array.from(text);
		let chunks: string[] = [];
		const maxChunkSize = Math.ceil(chars.length ** 0.5);

		let i = 0;
		while (i < chars.length) {
			const chunkSize = 1 + Math.ceil(Math.random() * maxChunkSize);
			const chunk = chars.slice(i, i + chunkSize).join("");
			chunks.push(chunk);
			i += chunkSize;
		}

		return chunks;
	};

	const obfuscatedText = obfuscateString(text);
	const sheet: StyleSheet = {};
	const elements = [];

	for (const chunk of splitText(obfuscatedText)) {
		const className = generateClassName();

		sheet[`.${className}::before`] = {
			content: `"${obfuscateString(chunk)}"`,
		};

		const decoyClassName = generateClassName();
		const maxDecoySize = 5;
		const decoyContent = generateRandomString(maxDecoySize);

		sheet[`.${decoyClassName}`] = {
			display: "none",
		};

		elements.push(
			<span key={className} className={className}>
				<span className={decoyClassName}>{decoyContent}</span>
			</span>
		);
	}

	return (
		<>
			<style>{generateStyleString(sheet)}</style>
			{elements}
		</>
	);
};
