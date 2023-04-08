/**
 * @author WMXPY
 * @namespace Proxy
 * @description Cloudflare
 */

import { ERROR_CODE } from "../error/code";
import { panic } from "../error/panic";
import { BarkDNSResolverBaseProvider } from "../provider/base";
import { BarkDNSResolverProxyMethod, BarkDNSResolverProxyResponse, BarkDNSResolverProxyType } from "./declare";

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

export const cloudFlareDNSProxy: BarkDNSResolverProxyMethod = async (
    domainName: string,
    type: BarkDNSResolverProxyType,
    provider: BarkDNSResolverBaseProvider,
): Promise<BarkDNSResolverProxyResponse> => {

    const jsonResponse: GetCloudFlareDNSRawResponse = await provider.sendGetJsonRequest(`https://cloudflare-dns.com/dns-query?name=${domainName}&type=${type}`);

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

    return {
        answer: jsonResponse.Answer[0].data,
    };
};
