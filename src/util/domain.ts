/**
 * @author WMXPY
 * @namespace Util
 * @description Domain
 */

import { URLStructure } from "@sudoo/url";

const fixDomainUrl = (url: string): URLStructure => {

    if (!url.startsWith('http://')
        && !url.startsWith('https://')) {

        return URLStructure.fromUrl(`https://${url}`);
    }
    return URLStructure.fromUrl(url);
};

export const getDomainHostOfURL = (url: string): string => {

    const parsed: URLStructure = fixDomainUrl(url);

    const port: string | null = parsed.buildPort();
    if (typeof port === 'string'
        && port.length > 0) {
        return `${parsed.buildHost()}:${port}`;
    }
    return parsed.buildHost() ?? '';
};

export const validateDomainName = (host: string): boolean => {

    const localhostRegexp: RegExp = /^localhost:\d{3,5}$/;
    if (localhostRegexp.test(host)) {
        return true;
    }

    const regexp: RegExp = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
    return regexp.test(host);
};
