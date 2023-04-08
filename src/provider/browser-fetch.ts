/**
 * @author WMXPY
 * @namespace Provider
 * @description Browser Fetch
 */

import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import { ERROR_CODE } from "../error/code";
import { panic } from "../error/panic";
import { BarkBrowserDNSBaseProvider } from "./base";

export class BarkBrowserDNSBrowserFetchProvider extends BarkBrowserDNSBaseProvider {

    public static create(): BarkBrowserDNSBrowserFetchProvider {

        return new BarkBrowserDNSBrowserFetchProvider();
    }

    public async sendGetJsonRequest<T extends Record<string, any>>(
        url: string,
    ): Promise<T> {

        const response: Response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/dns-json',
                },
            });

        if (response.status !== HTTP_RESPONSE_CODE.OK) {
            throw panic.code(
                ERROR_CODE.REQUEST_FAILED_1,
                await response.json(),
            );
        }

        const jsonResponse: T = await response.json();
        return jsonResponse;
    }
}
