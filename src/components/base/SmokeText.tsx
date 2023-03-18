import * as React from "react";
import { generateClassName, generateStyle } from "./utils";

export default ({children}) => {
	const text: string = children.normalize('NFC');

	// Предупреждение 'item was found 2' (/м.*о.*с.*к.*в.*а/i.test(element.innerHTML)) 
	// будет возникать всегда, но не из-за SmokeText а из-за обычного текста. Например:
	// "мин. от м. Сходненская. Развитая инфраструктура. Индивидуа"

	// 1) subtitute some chars to similar chars in different languages
	// 2) split text in pieces and insert it in spans
	// 3) generate salt

	const obfuscateString = (text: string): string => {
		// Используем только английские омоглифы, иначе появится большая
		// вероятность возникновения проблем со шрифтом
		const similarChars = {
			'а': 'a',
			'В': 'B',
			'Е': 'E',
			'е': 'e',
			'К': 'K',
			'М': 'M',
			'Н': 'H',
			'О': 'O',
			'о': 'o',
			'Р': 'P',
			'р': 'p',
			'с': 'c',
			'С': 'C',
			'Т': 'T',
			'у': 'y',
			'Х': 'X',
			'х': 'x',
		};

		// replaceAll unavailable. Iterating over string 
		const chars = Array.from(text);
		for (let i = 0; i < chars.length; i++) {
			if (similarChars.hasOwnProperty(chars[i])) {
				chars[i] = similarChars[chars[i]];
			}
		}

		return chars.join('');
	}

	const splitText = (text: string): string[] => {
		const chars = Array.from(text);
		const chunkSize = chars.length ** 0.5 >> 0;
		
		let chunks: string[] = [];

		let i = 0;
		while (i < chars.length) {
			const chunk = chars.slice(i, i + chunkSize).join('');
			chunks.push(chunk);
			i += chunkSize;
		}

		return chunks;
	}

	const obfuscatedText = obfuscateString(text);
	const sheet: {[key: string]: string} = {};
	const elements = [];
	
	for (const chunk of splitText(obfuscatedText)) {
		const className = generateClassName();
		const pseudoClassName = `${className}::after`
		sheet[`.${pseudoClassName}`] = `{
			content: "${obfuscateString(chunk)}"
		}`

		elements.push(<span key={className} className={className}/>)
	}


	
	return <>
		<style>{generateStyle(sheet)}</style>
		{elements}
	</>
};
