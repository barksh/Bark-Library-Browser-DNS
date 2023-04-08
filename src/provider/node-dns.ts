/**
 * @author WMXPY
 * @namespace Provider
 * @description Node DNS
 */

import * as DNS from "node:dns";
import { ERROR_CODE } from "../error/code";
import { panic } from "../error/panic";
import { BarkDNSResolverBaseProvider } from "./base";
import { BarkDNSResolverProxyType } from "./declare";

export class BarkDNSResolverProviderNodeDNS extends BarkDNSResolverBaseProvider {

    public static create(): BarkDNSResolverProviderNodeDNS {

        return new BarkDNSResolverProviderNodeDNS();
    }

    private constructor() {

        super();
    }

    public async resolveDNS(
        domainName: string,
        type: BarkDNSResolverProxyType,
    ): Promise<string> {

        switch (type) {
            case "A": return await this._lookupA(domainName);
            case "CNAME": return await this._lookupCName(domainName);
            case "TXT": return await this._lookupTxt(domainName);
        }

        throw panic.code(ERROR_CODE.NOT_IMPLEMENTED);
    }

    private _lookupA(
        domainName: string,
    ): Promise<string> {

        return new Promise((
            resolve: (value: string) => void,
            reject: (reason: Error) => void,
        ) => {

            DNS.lookup(domainName, (
                error: Error | null,
                address: string | undefined,
            ) => {

                if (error) {
                    reject(panic.code(ERROR_CODE.REQUEST_FAILED_1, error.message));
                    return;
                }

                if (typeof address === 'string') {
                    resolve(address);
                    return;
                }

                reject(panic.code(ERROR_CODE.INVALID_RESULT_1, address));
            });
        });
    }

    private _lookupCName(
        domainName: string,
    ): Promise<string> {

        return new Promise((
            resolve: (value: string) => void,
            reject: (reason: Error) => void,
        ) => {

            DNS.resolveCname(domainName, (
                error: Error | null,
                addresses: string[] | undefined,
            ) => {

                if (error) {
                    reject(panic.code(ERROR_CODE.REQUEST_FAILED_1, error.message));
                    return;
                }

                if (Array.isArray(addresses)) {
                    resolve(addresses[0]);
                    return;
                }

                reject(panic.code(ERROR_CODE.INVALID_RESULT_1, addresses));
            });
        });
    }

    private _lookupTxt(
        domainName: string,
    ): Promise<string> {

        return new Promise((
            resolve: (value: string) => void,
            reject: (reason: Error) => void,
        ) => {

            DNS.resolveTxt(domainName, (
                error: Error | null,
                addresses: string[][] | undefined,
            ) => {

                if (error) {
                    reject(panic.code(ERROR_CODE.REQUEST_FAILED_1, error.message));
                    return;
                }

                if (Array.isArray(addresses)) {
                    resolve(addresses[0][0]);
                    return;
                }

                reject(panic.code(ERROR_CODE.INVALID_RESULT_1, addresses));
            });
        });
    }
}
