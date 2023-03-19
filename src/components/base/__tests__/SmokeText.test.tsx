import React = require("react");
import { describe, test, expect } from "@jest/globals";
const renderer = require("react-test-renderer");

import SmokeText from "../SmokeText";

let counter = 0;
jest.mock("smokescreen/Cid", () => {
	return () => {
		++counter;
		return "className" + counter.toString();
	};
});

const generateStableRandomizer = (): (() => number) => {
	let value = 1;

	return (): number => {
		const j = 16807;
		const m = 2147483647;
		value = (value * j) % m;
		return value / m;
	};
};

describe("Рендер", () => {
	beforeEach(() => {
		counter = 0;
		jest.spyOn(global.Math, "random").mockImplementation(
			generateStableRandomizer()
		);
	});

	afterEach(() => {
		jest.spyOn(global.Math, "random").mockRestore();
	});

	test('Текст "Здесь могла быть ваша реклама"', () => {
		const component = renderer.create(
			<SmokeText>{"Здесь могла быть ваша реклама"}</SmokeText>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	test("Пустая строка", () => {
		const component = renderer.create(<SmokeText>{""}</SmokeText>);
		expect(component.toJSON()).toMatchSnapshot();
	});

	test("Один символ", () => {
		const component = renderer.create(<SmokeText>{"А"}</SmokeText>);
		expect(component.toJSON()).toMatchSnapshot();
	});
});
