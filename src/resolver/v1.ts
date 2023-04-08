/**
 * @author WMXPY
 * @namespace Resolver
 * @description V1
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { BarkDNSResolverProxyMethod } from "../proxy/declare";
import { getAuthenticationModuleV1WithDNSProxy } from "../v1/authentication-module";

export class BarkDNSResolverV1 {

    public static withProviderAndProxy(
        provider: BarkDNSResolverBaseProvider,
        proxy: BarkDNSResolverProxyMethod,
    ): BarkDNSResolverV1 {

        return new BarkDNSResolverV1(provider, proxy);
    }

    private readonly _provider: BarkDNSResolverBaseProvider;
    private readonly _proxy: BarkDNSResolverProxyMethod;

    private constructor(
        provider: BarkDNSResolverBaseProvider,
        proxy: BarkDNSResolverProxyMethod,
    ) {

        this._provider = provider;
        this._proxy = proxy;
    }

    public async resolveAuthenticationModule(domainName: string): Promise<string> {

        return await getAuthenticationModuleV1WithDNSProxy(
            domainName,
            this._provider,
            this._proxy,
        );
    }
}
