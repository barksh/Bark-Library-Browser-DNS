/**
 * @author WMXPY
 * @namespace V1
 * @description Phrase Ownership
 */

import { BarkBrowserDNSBaseProvider } from "../provider/base";
import { BarkBrowserDNSProxyMethod, BarkBrowserDNSProxyResponse } from "../proxy/declare";

const DNS_RECORD_NAME: string = '_bark-phrase-ownership-v1';

export const getParseOwnershipV1WithDNSProxy = async (
    domain: string,
    provider: BarkBrowserDNSBaseProvider,
    proxy: BarkBrowserDNSProxyMethod,
): Promise<string> => {

    const phraseOwnershipDomain: string =
        `${DNS_RECORD_NAME}.${domain}`;

    const dnsResponse: BarkBrowserDNSProxyResponse =
        await proxy(
            phraseOwnershipDomain,
            'TXT',
            provider,
        );

    const answer: string = dnsResponse.answer;

    if (answer.endsWith('.')) {
        return answer.slice(0, -1);
    }
    return answer;
};
