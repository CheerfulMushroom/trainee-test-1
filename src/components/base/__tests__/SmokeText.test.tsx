import React = require("react");
import { describe, test, expect } from "@jest/globals";
const renderer = require("react-test-renderer");

import { StableRandomizer } from "./__utils__/StableRandomizer";

import SmokeText from "../SmokeText";

let counter = 0;
jest.mock("smokescreen/Cid", () => {
	return () => {
		++counter;
		return "className" + counter.toString();
	};
});

describe("Рендер", () => {
	beforeEach(() => {
		counter = 0;
		const randomizer = new StableRandomizer(1);
		jest.spyOn(global.Math, "random").mockImplementation(() =>
			randomizer.random()
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

	test("Компоненты с одинаковым текстом рендерятся по-разному", () => {
		const adText = "Жилье в центре города";
		const component1 = renderer.create(<SmokeText>{adText}</SmokeText>);
		const component2 = renderer.create(<SmokeText>{adText}</SmokeText>);

		const snap1 = component1.toJSON();
		const snap2 = component2.toJSON();

		expect(snap1).not.toEqual(snap2);
	});
});
