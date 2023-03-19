import * as React from "react";

import * as generateClassName from "smokescreen/Cid";

import { generateStyleString } from "./utils";

type ImageProps = {
	width: number;
	height: number;
	src: string;
};

export default (props: ImageProps) => {
	// Можно воспользоваться transform, но тогда придётся дописать Left и Teaser,
	// чтобы прокинуть transfor и locator до Image, и дописать locatorMatches в
	// RenderComponent, если я захочу использовать другие имена классов.
	// Не уверен, что их можно изменять.

	const className: string = generateClassName();
	const sheet = {
		["." + className]: {
			width: `${props.width + "px"}`,
			height: `${props.height + "px"}`,
			"background-image": `url(${props.src})`,
		},
	};

	return (
		<>
			<style>{generateStyleString(sheet)}</style>
			<div className={className} />
		</>
	);
};
