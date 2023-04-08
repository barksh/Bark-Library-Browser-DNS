/**
 * @author WMXPY
 * @namespace Provider
 * @description Base
 */

import { BarkDNSResolverProxyType } from "./declare";

export abstract class BarkDNSResolverBaseProvider {

    public abstract resolveDNS(
        domainName: string,
        type: BarkDNSResolverProxyType,
    ): Promise<string>;
}
