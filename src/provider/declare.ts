/**
 * @author WMXPY
 * @namespace Provider
 * @description Declare
 */

export type BarkDNSResolverProxyType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'PTR' | 'SOA' | 'SRV' | 'TXT';

export type BrowserFetchLikeMethod = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
