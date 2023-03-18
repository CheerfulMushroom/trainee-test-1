import * as Cid from 'smokescreen/Cid'

export const generateStyle = (sheet: {[key: string]: string}): string => {
    let style: string = ''

    for (const [key, value] of Object.entries(sheet)) {
        if (value) {
            style += `${key} ${value}`;
        }
    }

    return style;
}

export const generateClassName = (): string => {
    return Cid();
}

export const generateStyleString  = (className: string, cssProperties: Object): string => {
    const styleStrings: string[] = [];
	for (const [key, value] of Object.entries(cssProperties)) {
        if (value) {
		    styleStrings.push(`${key}:${value}`);
        }
	}

    return `.${className} {${styleStrings.join(';')}}`;
}

