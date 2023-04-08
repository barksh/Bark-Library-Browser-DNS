/**
 * @author WMXPY
 * @namespace Resolver
 * @description Resolver
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { BarkDNSResolverBrowserFetchProvider } from "../provider/browser-fetch";
import { cloudFlareDNSProxy } from "../proxy/cloudflare";
import { BarkDNSResolverProxyMethod } from "../proxy/declare";
import { BarkDNSResolverV1 } from "./v1";

export class BarkDNSResolver {

    public static withProviderAndProxy(
        provider: BarkDNSResolverBaseProvider,
        proxy: BarkDNSResolverProxyMethod,
    ): BarkDNSResolver {

        return new BarkDNSResolver(provider, proxy);
    }

    public static withProviderAndDefaultProxy(
        provider: BarkDNSResolverBaseProvider,
    ): BarkDNSResolver {

        return new BarkDNSResolver(
            provider,
            cloudFlareDNSProxy,
        );
    }

    public static withDefaultProviderAndProxy(
        proxy: BarkDNSResolverProxyMethod,
    ): BarkDNSResolver {

        return new BarkDNSResolver(
            BarkDNSResolverBrowserFetchProvider.create(),
            proxy,
        );
    }

    public static withDefault(): BarkDNSResolver {

        return new BarkDNSResolver(
            BarkDNSResolverBrowserFetchProvider.create(),
            cloudFlareDNSProxy,
        );
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

    public get V1() {

        return BarkDNSResolverV1.withProviderAndProxy(
            this._provider,
            this._proxy,
        );
    }
}
