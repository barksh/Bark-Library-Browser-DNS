/**
 * @author WMXPY
 * @namespace Resolver
 * @description Resolver
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { BarkDNSResolverProviderBrowserFetchCloudflare } from "../provider/browser-fetch-cloudflare";
import { BarkDNSResolverV1 } from "./v1";

export class BarkDNSResolver {

    public static withProvider(
        provider: BarkDNSResolverBaseProvider,
    ): BarkDNSResolver {

        return new BarkDNSResolver(provider);
    }

    public static withBrowserDefault(): BarkDNSResolver {

        return BarkDNSResolver.withProvider(
            BarkDNSResolverProviderBrowserFetchCloudflare.create(),
        );
    }

    private readonly _provider: BarkDNSResolverBaseProvider;

    private constructor(
        provider: BarkDNSResolverBaseProvider,
    ) {

        this._provider = provider;
    }

    public get V1() {

        return BarkDNSResolverV1.withProviderAndProxy(
            this._provider,
        );
    }
}
