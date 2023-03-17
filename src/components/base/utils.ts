import * as Cid from 'smokescreen/Cid'

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

