/**
 * @author WMXPY
 * @namespace Provider
 * @description Base
 */

export abstract class BarkBrowserDNSBaseProvider {

    public abstract sendGetJsonRequest<T extends Record<string, any>>(
        url: string,
    ): Promise<T>;
}
