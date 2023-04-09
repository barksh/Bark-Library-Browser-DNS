/**
 * @author WMXPY
 * @namespace V1
 * @description Allowed Callback
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkDNSResolver, BarkDNSResolverBaseProvider } from "../../../src";
import { MockProvider } from "../../mock/provider";

describe("Given (Allowed Callback) testing cases", (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance("placeholder");

    it("should be able to resolve allowed callback with same record and domain", async (): Promise<void> => {

        const provider: BarkDNSResolverBaseProvider = MockProvider.toCompleteWith("first.com");
        const resolver: BarkDNSResolver = BarkDNSResolver.withProvider(provider);

        const result: string[] = await resolver.V1.resolveAllowedCallback("first.com");

        expect(result).to.be.deep.equal([
            "first.com",
        ]);
    });

    it("should be able to resolve allowed callback with different record and domain", async (): Promise<void> => {

        const provider: BarkDNSResolverBaseProvider = MockProvider.toCompleteWith("second.com");
        const resolver: BarkDNSResolver = BarkDNSResolver.withProvider(provider);

        const result: string[] = await resolver.V1.resolveAllowedCallback("first.com");

        expect(result).to.be.deep.equal([
            "first.com",
            "second.com",
        ]);
    });

    it("should be able to resolve allowed callback with multiple record and domain", async (): Promise<void> => {

        const provider: BarkDNSResolverBaseProvider = MockProvider.toCompleteWith("second.com,third.com");
        const resolver: BarkDNSResolver = BarkDNSResolver.withProvider(provider);

        const result: string[] = await resolver.V1.resolveAllowedCallback("first.com");

        expect(result).to.be.deep.equal([
            "first.com",
            "second.com",
            "third.com",
        ]);
    });

    it("should be able to resolve allowed callback with multiple record and domain - with space", async (): Promise<void> => {

        const provider: BarkDNSResolverBaseProvider = MockProvider.toCompleteWith(" second.com, third.com  ");
        const resolver: BarkDNSResolver = BarkDNSResolver.withProvider(provider);

        const result: string[] = await resolver.V1.resolveAllowedCallback("first.com");

        expect(result).to.be.deep.equal([
            "first.com",
            "second.com",
            "third.com",
        ]);
    });

    it("should be able to resolve allowed callback with multiple record and domain - with invalid domain", async (): Promise<void> => {

        const provider: BarkDNSResolverBaseProvider = MockProvider.toCompleteWith(chance.string());
        const resolver: BarkDNSResolver = BarkDNSResolver.withProvider(provider);

        const result: string[] = await resolver.V1.resolveAllowedCallback("first.com");

        expect(result).to.be.deep.equal([
            "first.com",
        ]);
    });
});
