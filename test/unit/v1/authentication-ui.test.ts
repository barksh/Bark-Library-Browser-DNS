/**
 * @author WMXPY
 * @namespace V1
 * @description Authentication UI
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkDNSResolver, BarkDNSResolverBaseProvider } from "../../../src";
import { MockProvider } from "../../mock/provider";

describe("Given (Authentication UI) testing cases", (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance("v1-authentication-ui");

    it("should be able to resolve authentication ui", async (): Promise<void> => {

        const provider: BarkDNSResolverBaseProvider = MockProvider.toCompleteWith("target.com");
        const resolver: BarkDNSResolver = BarkDNSResolver.withProvider(provider);

        const result: string = await resolver.V1.resolveAuthenticationUI("first.com");

        expect(result).to.be.equal("target.com");
    });

    it("should be able to resolve authentication ui with throw result", async (): Promise<void> => {

        const provider: BarkDNSResolverBaseProvider = MockProvider.toThrow(new Error("error"));
        const resolver: BarkDNSResolver = BarkDNSResolver.withProvider(provider);

        let error: Error | null = null;

        try {
            await resolver.V1.resolveAuthenticationUI("first.com");
        } catch (err) {
            error = err as Error;
        }

        expect(error?.message).to.be.equal("error");
    });
});
