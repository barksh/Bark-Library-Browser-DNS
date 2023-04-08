/**
 * @author WMXPY
 * @namespace Proxy
 * @description Declare
 */

export type GetCloudFlareDNSRawResponse = {

    readonly Status: 0 | 3;
    readonly TC: boolean;
    readonly RD: boolean;
    readonly RA: boolean;
    readonly AD: boolean;
    readonly CD: boolean;

    readonly Question: Array<{
        readonly name: string;
        readonly type: 5;
    }>;
    readonly Answer: Array<{
        readonly name: string;
        readonly type: 5;
        readonly TTL: number;
        readonly data: string;
    }>;
};
