import { describe, test, expect } from "@jest/globals";
import { obfuscateString } from "../utils";

describe("Обфускация текста", () => {
	test("Исходный текст изменён", () => {
		const text = "Реклама";
		expect(obfuscateString(text)).not.toEqual(text);
	});

	test("Длина строки не изменилась", () => {
		const text = "Здесь могла бы быть ваша реклама";
		expect(obfuscateString(text).length).toEqual(text.length);
	});
});
