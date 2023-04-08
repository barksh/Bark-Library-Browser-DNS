/**
 * @author WMXPY
 * @namespace V1
 * @description Phrase Ownership
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { BarkDNSResolverProxyMethod, BarkDNSResolverProxyResponse } from "../proxy/declare";

const DNS_RECORD_NAME: string = '_bark-phrase-ownership-v1';

export const getPhraseOwnershipV1WithDNSProxy = async (
    domain: string,
    provider: BarkDNSResolverBaseProvider,
    proxy: BarkDNSResolverProxyMethod,
): Promise<string> => {

    const phraseOwnershipDomain: string =
        `${DNS_RECORD_NAME}.${domain}`;

    const dnsResponse: BarkDNSResolverProxyResponse =
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
