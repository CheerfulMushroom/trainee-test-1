"use strict";

import { jest } from "@jest/globals";

const mock = jest.genMockFromModule("./utils") as any;

let counter = 0;
const generateClassName = (): string => {
	++counter;
	return "className" + counter.toString();
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

mock.__reset = () => {
	counter = 0;
};
mock.generateClassName = generateClassName;
mock.generateStyleString = generateStyleString;

module.exports = mock;
