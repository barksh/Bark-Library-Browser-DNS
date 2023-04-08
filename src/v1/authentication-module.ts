/**
 * @author WMXPY
 * @namespace V1
 * @description Authentication Module
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { BarkDNSResolverProxyMethod, BarkDNSResolverProxyResponse } from "../proxy/declare";

const DNS_RECORD_NAME: string = '_bark-module-authentication-v1';

export const getAuthenticationModuleV1WithDNSProxy = async (
    domainName: string,
    provider: BarkDNSResolverBaseProvider,
    proxy: BarkDNSResolverProxyMethod,
): Promise<string> => {

    const authenticationModuleDomain: string =
        `${DNS_RECORD_NAME}.${domainName}`;

    const dnsResponse: BarkDNSResolverProxyResponse =
        await proxy(
            authenticationModuleDomain,
            'CNAME',
            provider,
        );

    const answer: string = dnsResponse.answer;

    if (answer.endsWith('.')) {
        return answer.slice(0, -1);
    }
    return answer;
};
