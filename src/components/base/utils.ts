import * as Cid from "smokescreen/Cid";

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

export const generateClassName = (): string => {
	return Cid();
};
