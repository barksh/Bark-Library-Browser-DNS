/**
 * @author WMXPY
 * @namespace V1
 * @description Phrase Ownership
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { validateDomainName } from "../util/domain";

const DNS_RECORD_NAME: string = '_bark-phrase-ownership-v1';

export const getPhraseOwnershipV1WithDNSProxy = async (
    domain: string,
    provider: BarkDNSResolverBaseProvider,
): Promise<string[]> => {

    const phraseOwnershipDomain: string =
        `${DNS_RECORD_NAME}.${domain}`;

    try {

        const dnsResponse: string =
            await provider.resolveDNS(
                phraseOwnershipDomain,
                'TXT',
            );

        const domainList: string[] = dnsResponse
            .split(',')
            .map((each: string) => each.trim())
            .filter((each: string) => validateDomainName(each));

        return domainList;
    } catch (error) {

        return [];
    }
};
