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

    it("Placeholder", async (): Promise<void> => {

        const provider: BarkDNSResolverBaseProvider = MockProvider.create("first.com");
        const resolver: BarkDNSResolver = BarkDNSResolver.withProvider(provider);

        const result: string[] = await resolver.V1.resolveAllowedCallback("first.com");

        expect(result).to.be.deep.equal([
            "first.com",
        ]);
    });
});
