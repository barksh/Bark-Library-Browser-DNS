/**
 * @author WMXPY
 * @namespace V1
 * @description Authentication UI
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { BarkDNSResolverProxyMethod, BarkDNSResolverProxyResponse } from "../proxy/declare";

const DNS_RECORD_NAME: string = '_bark-ui-authentication-v1';

export const getAuthenticationUIV1WithDNSProxy = async (
    domain: string,
    provider: BarkDNSResolverBaseProvider,
    proxy: BarkDNSResolverProxyMethod,
): Promise<string> => {

    const authenticationUIDomain: string =
        `${DNS_RECORD_NAME}.${domain}`;

    const dnsResponse: BarkDNSResolverProxyResponse =
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
