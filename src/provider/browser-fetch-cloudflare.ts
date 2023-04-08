/**
 * @author WMXPY
 * @namespace Provider
 * @description Browser Fetch Cloudflare
 */

import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import { ERROR_CODE } from "../error/code";
import { panic } from "../error/panic";
import { BarkDNSResolverBaseProvider } from "./base";
import { BarkDNSResolverProxyType, BrowserFetchLikeMethod } from "./declare";

type GetCloudFlareDNSRawResponse = {

    readonly Status: 0 | 3;
    readonly TC: boolean;
    readonly RD: boolean;
    readonly RA: boolean;
    readonly AD: boolean;
    readonly CD: boolean;

    readonly Question: Array<{
        readonly name: string;
        readonly type: 5;
    }>;
    readonly Answer: Array<{
        readonly name: string;
        readonly type: 5;
        readonly TTL: number;
        readonly data: string;
    }>;
};

export class BarkDNSResolverProviderBrowserFetchCloudflare extends BarkDNSResolverBaseProvider {

    public static create(
        fetchMethod: BrowserFetchLikeMethod = fetch,
    ): BarkDNSResolverProviderBrowserFetchCloudflare {

        return new BarkDNSResolverProviderBrowserFetchCloudflare(fetchMethod);
    }

    private readonly _fetchMethod: BrowserFetchLikeMethod;

    private constructor(
        fetchMethod: BrowserFetchLikeMethod,
    ) {

        super();

        this._fetchMethod = fetchMethod;
    }

    public async resolveDNS(
        domainName: string,
        type: BarkDNSResolverProxyType,
    ): Promise<string> {

        const jsonResponse: GetCloudFlareDNSRawResponse =
            await this._sendGetJsonRequest(
                `https://cloudflare-dns.com/dns-query?name=${domainName}&type=${type}`,
            );

        if (jsonResponse.Status !== 0) {
            throw panic.code(
                ERROR_CODE.REQUEST_FAILED_1,
                jsonResponse,
            );
        }

        if (jsonResponse.Answer.length <= 0) {
            throw panic.code(
                ERROR_CODE.REQUEST_FAILED_1,
                jsonResponse,
            );
        }

        return jsonResponse.Answer[0].data;
    }

    private async _sendGetJsonRequest<T extends Record<string, any>>(
        url: string,
    ): Promise<T> {

        const response: Response = await this._fetchMethod(
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
