/**
 * @author WMXPY
 * @namespace Proxy
 * @description Declare
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";

export type BarkDNSResolverProxyType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'PTR' | 'SOA' | 'SRV' | 'TXT';

export type BarkDNSResolverProxyResponse = {

    readonly answer: string;
};

export type BarkDNSResolverProxyMethod = (
    domainName: string,
    type: BarkDNSResolverProxyType,
    provider: BarkDNSResolverBaseProvider,
) => Promise<BarkDNSResolverProxyResponse>;
