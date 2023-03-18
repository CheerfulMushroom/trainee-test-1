import React = require("react");
import { describe, test, expect } from "@jest/globals";
const TestRenderer = require("react-test-renderer");

import SmokeText from "./SmokeText";
import {} from "./utils";

jest.mock("./utils");

describe("returns true", () => {
	test("test 1", () => {
		const renderer = TestRenderer.create(<SmokeText>asd</SmokeText>);
		console.log(renderer.toJSON());
		expect(true).toBeTruthy();
	});

	test("test 2", () => {
		expect(false).toBeTruthy();
	});
});
