export type StyleSheet = {
	[selector: string]: {
		[style: string]: string;
	};
};

export const generateStyleString = (sheet: StyleSheet): string => {
	let result: string = "";

	for (const [selector, styles] of Object.entries(sheet)) {
		let styleStrings = [];

		for (const [style, value] of Object.entries(styles)) {
			if (value) {
				styleStrings.push(`${style}: ${value}`);
			}
		}

		result += `${selector} {${styleStrings.join(";")}}`;
	}

	return result;
};

export const obfuscateString = (text: string): string => {
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
		const tryReplace = Math.round(Math.random());
		if (tryReplace && similarChars.hasOwnProperty(chars[i])) {
			chars[i] = similarChars[chars[i]];
		}
	}

	return chars.join("");
};

export const generateRandomString = (maxLength: number): string => {
	const alphabet =
		"абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
	const stringSize = (Math.random() * maxLength + 1) >> 0;

	let result = "";
	for (let i = 0; i < stringSize; i++) {
		result += alphabet[Math.floor(Math.random() * alphabet.length)];
	}

	return result;
};
