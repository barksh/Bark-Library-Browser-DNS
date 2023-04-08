/**
 * @author WMXPY
 * @namespace Resolver
 * @description V1
 */

import { BarkDNSResolverBaseProvider } from "../provider/base";
import { getAuthenticationModuleV1WithDNSProxy } from "../v1/authentication-module";
import { getAuthenticationUIV1WithDNSProxy } from "../v1/authentication-ui";
import { getPhraseOwnershipV1WithDNSProxy } from "../v1/phrase-ownership";

export class BarkDNSResolverV1 {

    public static withProviderAndProxy(
        provider: BarkDNSResolverBaseProvider,
    ): BarkDNSResolverV1 {

        return new BarkDNSResolverV1(provider);
    }

    private readonly _provider: BarkDNSResolverBaseProvider;

    private constructor(
        provider: BarkDNSResolverBaseProvider,
    ) {

        this._provider = provider;
    }

    public async resolveAuthenticationModule(domainName: string): Promise<string> {

        return await getAuthenticationModuleV1WithDNSProxy(
            domainName,
            this._provider,
        );
    }

    public async resolveAuthenticationUI(domainName: string): Promise<string> {

        return await getAuthenticationUIV1WithDNSProxy(
            domainName,
            this._provider,
        );
    }

    public async resolvePhraseOwnership(domainName: string): Promise<string> {

        return await getPhraseOwnershipV1WithDNSProxy(
            domainName,
            this._provider,
        );
    }
}
