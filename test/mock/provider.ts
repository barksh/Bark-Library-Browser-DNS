/**
 * @author WMXPY
 * @namespace Provider
 * @description Provider
 * @override Mock
 */

import { BarkDNSResolverBaseProvider } from "../../src";

export class MockProvider extends BarkDNSResolverBaseProvider {

    public static create(
        response: string,
    ): MockProvider {

        return new MockProvider(response);
    }

    private readonly _response: string;

    private constructor(
        response: string,
    ) {

        super();

        this._response = response;
    }

    public async resolveDNS(): Promise<string> {

        return this._response;
    }
}
