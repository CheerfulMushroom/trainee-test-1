import * as React from "react";

import { generateClassName, generateStyleString } from "./utils";
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

	const obfuscateString = (text: string): string => {
		// Используем только английские омоглифы, иначе появится
		// вероятность возникновения проблем со шрифтом
		const similarChars = {
			а: "a",
			В: "B",
			Е: "E",
			е: "e",
			К: "K",
			М: "M",
			Н: "H",
			О: "O",
			о: "o",
			Р: "P",
			р: "p",
			с: "c",
			С: "C",
			Т: "T",
			у: "y",
			Х: "X",
			х: "x",
		};

		// replaceAll unavailable. Iterating over string
		const chars = Array.from(text);
		for (let i = 0; i < chars.length; i++) {
			if (similarChars.hasOwnProperty(chars[i])) {
				chars[i] = similarChars[chars[i]];
			}
		}

		return chars.join("");
	};

	const splitText = (text: string): string[] => {
		const chars = Array.from(text);
		const chunkSize = (chars.length ** 0.5) >> 0;

		let chunks: string[] = [];

		let i = 0;
		while (i < chars.length) {
			const chunk = chars.slice(i, i + chunkSize).join("");
			chunks.push(chunk);
			i += chunkSize;
		}

		return chunks;
	};

	const generateRandomString = (maxLength: number): string => {
		const alphabet =
			"абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
		const stringSize = (Math.random() * maxLength + 1) >> 0;

		let result = "";
		for (let i = 0; i < stringSize; i++) {
			result += alphabet[Math.floor(Math.random() * alphabet.length)];
		}

		return result;
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
