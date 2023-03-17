import * as React from 'react';

import {generateClassName, generateStyleString} from './utils'


type ImageProps = {
	width: number,
	height: number,
	src: string,
}


export default (props: ImageProps) => {
	// Можно воспользоваться transform, но тогда придётся дописать Left и Teaser, 
	// чтобы прокинуть transfor и locator до Image, и дописать locatorMatches в 
	// RenderComponent, если я захочу использовать другие имена классов.
	// Не уверен, что их можно изменять.

	const styles = {
		width: props.width + 'px',
		height: props.height + 'px',
		"background-image": `url(${props.src})`,
	}

	const className: string = `${generateClassName()}`;
	
	return (
		<>
			<style>{generateStyleString(className, styles)}</style>
			<div className={className}/>
		</>
	);
};
