/**
 * @author WMXPY
 * @namespace V1
 * @description Authentication UI
 */

import { BarkBrowserDNSBaseProvider } from "../provider/base";
import { BarkBrowserDNSProxyMethod, BarkBrowserDNSProxyResponse } from "../proxy/declare";

const DNS_RECORD_NAME: string = '_bark-ui-authentication-v1';

export const getAuthenticationUIV1WithDNSProxy = async (
    domain: string,
    provider: BarkBrowserDNSBaseProvider,
    proxy: BarkBrowserDNSProxyMethod,
): Promise<string> => {

    const authenticationUIDomain: string =
        `${DNS_RECORD_NAME}.${domain}`;

    const dnsResponse: BarkBrowserDNSProxyResponse =
        await proxy(
            authenticationUIDomain,
            'CNAME',
            provider,
        );

    const answer: string = dnsResponse.answer;

    if (answer.endsWith('.')) {
        return answer.slice(0, -1);
    }
    return answer;
};
