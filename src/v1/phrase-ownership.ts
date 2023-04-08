/**
 * @author WMXPY
 * @namespace V1
 * @description Phrase Ownership
 */

import { getCloudFlareDNS, GetCloudFlareDNSResponse } from "../proxy/cloudflare";

const DNS_RECORD_NAME: string = '_bark-phrase-ownership-v1';

export const getParseOwnershipV1WithDNSProxy = async (
    domain: string,
): Promise<string> => {

    const phraseOwnershipDomain: string =
        `${DNS_RECORD_NAME}.${domain}`;

    const dnsResponse: GetCloudFlareDNSResponse =
        await getCloudFlareDNS(phraseOwnershipDomain, 'TXT');

    const answer: string = dnsResponse.answer;

    if (answer.endsWith('.')) {
        return answer.slice(0, -1);
    }
    return answer;
};
