/**
 * @author WMXPY
 * @namespace V1
 * @description Authentication Module
 */

import { BarkBrowserDNSBaseProvider } from "../provider/base";
import { BarkBrowserDNSProxyMethod, BarkBrowserDNSProxyResponse } from "../proxy/declare";

const DNS_RECORD_NAME: string = '_bark-module-authentication-v1';

export const getAuthenticationModuleV1WithDNSProxy = async (
    domainName: string,
    provider: BarkBrowserDNSBaseProvider,
    proxy: BarkBrowserDNSProxyMethod,
): Promise<string> => {

    const authenticationModuleDomain: string =
        `${DNS_RECORD_NAME}.${domainName}`;

    const dnsResponse: BarkBrowserDNSProxyResponse =
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
