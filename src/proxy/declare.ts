/**
 * @author WMXPY
 * @namespace Proxy
 * @description Declare
 */

import { BarkBrowserDNSBaseProvider } from "../provider/base";

export type BarkBrowserDNSProxyType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'PTR' | 'SOA' | 'SRV' | 'TXT';

export type BarkBrowserDNSProxyResponse = {

    readonly answer: string;
};

export type BarkBrowserDNSProxyMethod = (
    domainName: string,
    type: BarkBrowserDNSProxyType,
    provider: BarkBrowserDNSBaseProvider,
) => Promise<BarkBrowserDNSProxyResponse>;
