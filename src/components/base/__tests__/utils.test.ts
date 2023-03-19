import { describe, test, expect } from "@jest/globals";

import { StableRandomizer } from "./__utils__/StableRandomizer";
import { obfuscateString } from "../utils";

describe("Обфускация текста", () => {
	beforeEach(() => {
		const randomizer = new StableRandomizer(1);
		jest.spyOn(global.Math, "random").mockImplementation(() =>
			randomizer.random()
		);
	});

	afterEach(() => {
		jest.spyOn(global.Math, "random").mockRestore();
	});

	test("Исходный текст изменён", () => {
		const text = "Реклама";
		expect(obfuscateString(text)).not.toEqual(text);
	});

	test("Длина строки не изменилась", () => {
		const text = "Здесь могла бы быть ваша реклама";
		expect(obfuscateString(text).length).toEqual(text.length);
	});

	test("Текст каждый раз обфусцируется по-разному", () => {
		const original = "Престижные новостройки в Москве";
		const text1 = obfuscateString(original);
		const text2 = obfuscateString(original);
		expect(text1).not.toEqual(text2);
	});
});
