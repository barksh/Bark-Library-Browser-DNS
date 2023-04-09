/**
 * @author WMXPY
 * @namespace Provider
 * @description Provider
 * @override Mock
 */

import { BarkDNSResolverBaseProvider } from "../../src";

export class MockProvider extends BarkDNSResolverBaseProvider {

    public static toCompleteWith(
        response: string,
    ): MockProvider {

        return new MockProvider(response);
    }

    public static toThrow(
        error: Error,
    ): MockProvider {

        return new MockProvider(null, error);
    }

    private readonly _response: string | null;
    private readonly _error?: Error;

    private constructor(
        response: string | null,
        error?: Error,
    ) {

        super();

        this._response = response;
        this._error = error;
    }

    public async resolveDNS(): Promise<string> {

        if (this._error) {
            throw this._error;
        }

        return this._response as string;
    }
}
