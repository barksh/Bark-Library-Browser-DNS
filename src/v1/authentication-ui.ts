/**
 * @author WMXPY
 * @namespace V1
 * @description Authentication UI
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";

const DNS_RECORD_NAME: string = '_bark-ui-authentication-v1';

export const getAuthenticationUIV1WithDNSProxy = async (
    domain: string,
    provider: BarkDNSResolverBaseProvider,
): Promise<string> => {

    const authenticationUIDomain: string =
        `${DNS_RECORD_NAME}.${domain}`;

    const dnsResponse: string =
        await provider.resolveDNS(
            authenticationUIDomain,
            'CNAME',
        );

    if (dnsResponse.endsWith('.')) {
        return dnsResponse.slice(0, -1);
    }
    return dnsResponse;
};
