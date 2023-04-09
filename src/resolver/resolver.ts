/**
 * @author WMXPY
 * @namespace Resolver
 * @description Resolver
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { BarkDNSResolverProviderBrowserFetchCloudflare } from "../provider/browser-fetch-cloudflare";
import { BrowserFetchLikeMethod } from "../provider/declare";
import { BarkDNSResolverProviderNodeDNS } from "../provider/node-dns";
import { BarkDNSResolverV1 } from "./v1";

export class BarkDNSResolver {

    public static withProvider(
        provider: BarkDNSResolverBaseProvider,
    ): BarkDNSResolver {

        return new BarkDNSResolver(provider);
    }

    public static withBrowserDefault(
        fetchMethod?: BrowserFetchLikeMethod,
    ): BarkDNSResolver {

        return BarkDNSResolver.withProvider(
            BarkDNSResolverProviderBrowserFetchCloudflare.create(fetchMethod),
        );
    }

    public static withNodeDefault(): BarkDNSResolver {

        return BarkDNSResolver.withProvider(
            BarkDNSResolverProviderNodeDNS.create(),
        );
    }

    private readonly _provider: BarkDNSResolverBaseProvider;

    private constructor(
        provider: BarkDNSResolverBaseProvider,
    ) {

        this._provider = provider;
    }

    public get V1(): BarkDNSResolverV1 {

        return BarkDNSResolverV1.withProviderAndProxy(
            this._provider,
        );
    }
}
