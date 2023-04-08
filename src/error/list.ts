/**
 * @author WMXPY
 * @namespace Error
 * @description List
 */

import { ERROR_CODE } from "./code";

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.REQUEST_FAILED_1]: "Request failed, message: {}",

    [ERROR_CODE.INVALID_RESULT_1]: "Invalid result, message: {}",

    [ERROR_CODE.NOT_IMPLEMENTED]: "Not implemented",
};
