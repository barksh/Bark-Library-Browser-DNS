/**
 * @author WMXPY
 * @namespace Resolver
 * @description Resolver
 */

import { BarkBrowserDNSBaseProvider } from "../provider/base";
import { BarkBrowserDNSBrowserFetchProvider } from "../provider/browser-fetch";
import { cloudFlareDNSProxy } from "../proxy/cloudflare";
import { BarkBrowserDNSProxyMethod } from "../proxy/declare";

export class BarkBrowserDNSResolver {

    public static withProviderAndProxy(
        provider: BarkBrowserDNSBaseProvider,
        proxy: BarkBrowserDNSProxyMethod,
    ): BarkBrowserDNSResolver {

        return new BarkBrowserDNSResolver(provider, proxy);
    }

    public static withProviderAndDefaultProxy(
        provider: BarkBrowserDNSBaseProvider,
    ): BarkBrowserDNSResolver {

        return new BarkBrowserDNSResolver(
            provider,
            cloudFlareDNSProxy,
        );
    }

    public static withDefaultProviderAndProxy(
        proxy: BarkBrowserDNSProxyMethod,
    ): BarkBrowserDNSResolver {

        return new BarkBrowserDNSResolver(
            BarkBrowserDNSBrowserFetchProvider.create(),
            proxy,
        );
    }

    public static withDefault(): BarkBrowserDNSResolver {

        return new BarkBrowserDNSResolver(
            BarkBrowserDNSBrowserFetchProvider.create(),
            cloudFlareDNSProxy,
        );
    }

    private readonly _provider: BarkBrowserDNSBaseProvider;
    private readonly _proxy: BarkBrowserDNSProxyMethod;

    private constructor(
        provider: BarkBrowserDNSBaseProvider,
        proxy: BarkBrowserDNSProxyMethod,
    ) {

        this._provider = provider;
        this._proxy = proxy;
    }
}
