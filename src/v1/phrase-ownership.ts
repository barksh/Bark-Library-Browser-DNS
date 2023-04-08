/**
 * @author WMXPY
 * @namespace V1
 * @description Phrase Ownership
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";

const DNS_RECORD_NAME: string = '_bark-phrase-ownership-v1';

export const getPhraseOwnershipV1WithDNSProxy = async (
    domain: string,
    provider: BarkDNSResolverBaseProvider,
): Promise<string> => {

    const phraseOwnershipDomain: string =
        `${DNS_RECORD_NAME}.${domain}`;

    const dnsResponse: string =
        await provider.resolveDNS(
            phraseOwnershipDomain,
            'TXT',
        );

    if (dnsResponse.endsWith('.')) {
        return dnsResponse.slice(0, -1);
    }
    return dnsResponse;
};
