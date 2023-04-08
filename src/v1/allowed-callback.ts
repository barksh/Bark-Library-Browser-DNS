/**
 * @author WMXPY
 * @namespace V1
 * @description Allowed Callback
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { getDomainHostOfURL, validateDomainName } from "../util/domain";

const DNS_RECORD_NAME: string = '_bark-allowed-callback-v1';

export const getAllowedCallbackV1WithDNSProxy = async (
    domainName: string,
    provider: BarkDNSResolverBaseProvider,
): Promise<string[]> => {

    const allowedCallbackDomain: string =
        `${DNS_RECORD_NAME}.${domainName}`;

    const domainHost: string = getDomainHostOfURL(domainName);

    try {

        const dnsResponse: string =
            await provider.resolveDNS(
                allowedCallbackDomain,
                'TXT',
            );

        const domainList: string[] = dnsResponse
            .split(',')
            .map((each: string) => each.trim())
            .filter((each: string) => validateDomainName(each));

        if (domainList.includes(domainHost)) {
            return domainList;
        }

        return [domainHost, ...domainList];
    } catch (error) {

        return [domainHost];
    }
};
