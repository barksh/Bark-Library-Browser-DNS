/**
 * @author WMXPY
 * @namespace V1
 * @description Authentication Module
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";

const DNS_RECORD_NAME: string = '_bark-module-authentication-v1';

export const getAuthenticationModuleV1WithDNSProxy = async (
    domainName: string,
    provider: BarkDNSResolverBaseProvider,
): Promise<string> => {

    const authenticationModuleDomain: string =
        `${DNS_RECORD_NAME}.${domainName}`;

    const dnsResponse: string =
        await provider.resolveDNS(
            authenticationModuleDomain,
            'CNAME',
        );

    if (dnsResponse.endsWith('.')) {
        return dnsResponse.slice(0, -1);
    }
    return dnsResponse;
};
