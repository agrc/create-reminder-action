require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(87));
const path = __importStar(__nccwpck_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(747));
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 53:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Context = void 0;
const fs_1 = __nccwpck_require__(747);
const os_1 = __nccwpck_require__(87);
class Context {
    /**
     * Hydrate the context from the environment
     */
    constructor() {
        var _a, _b, _c;
        this.payload = {};
        if (process.env.GITHUB_EVENT_PATH) {
            if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
                this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));
            }
            else {
                const path = process.env.GITHUB_EVENT_PATH;
                process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
            }
        }
        this.eventName = process.env.GITHUB_EVENT_NAME;
        this.sha = process.env.GITHUB_SHA;
        this.ref = process.env.GITHUB_REF;
        this.workflow = process.env.GITHUB_WORKFLOW;
        this.action = process.env.GITHUB_ACTION;
        this.actor = process.env.GITHUB_ACTOR;
        this.job = process.env.GITHUB_JOB;
        this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
        this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
        this.apiUrl = (_a = process.env.GITHUB_API_URL) !== null && _a !== void 0 ? _a : `https://api.github.com`;
        this.serverUrl = (_b = process.env.GITHUB_SERVER_URL) !== null && _b !== void 0 ? _b : `https://github.com`;
        this.graphqlUrl = (_c = process.env.GITHUB_GRAPHQL_URL) !== null && _c !== void 0 ? _c : `https://api.github.com/graphql`;
    }
    get issue() {
        const payload = this.payload;
        return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
    }
    get repo() {
        if (process.env.GITHUB_REPOSITORY) {
            const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
            return { owner, repo };
        }
        if (this.payload.repository) {
            return {
                owner: this.payload.repository.owner.login,
                repo: this.payload.repository.name
            };
        }
        throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map

/***/ }),

/***/ 438:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOctokit = exports.context = void 0;
const Context = __importStar(__nccwpck_require__(53));
const utils_1 = __nccwpck_require__(30);
exports.context = new Context.Context();
/**
 * Returns a hydrated octokit ready to use for GitHub Actions
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokit(token, options) {
    return new utils_1.GitHub(utils_1.getOctokitOptions(token, options));
}
exports.getOctokit = getOctokit;
//# sourceMappingURL=github.js.map

/***/ }),

/***/ 914:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getApiBaseUrl = exports.getProxyAgent = exports.getAuthString = void 0;
const httpClient = __importStar(__nccwpck_require__(925));
function getAuthString(token, options) {
    if (!token && !options.auth) {
        throw new Error('Parameter token or opts.auth is required');
    }
    else if (token && options.auth) {
        throw new Error('Parameters token and opts.auth may not both be specified');
    }
    return typeof options.auth === 'string' ? options.auth : `token ${token}`;
}
exports.getAuthString = getAuthString;
function getProxyAgent(destinationUrl) {
    const hc = new httpClient.HttpClient();
    return hc.getAgent(destinationUrl);
}
exports.getProxyAgent = getProxyAgent;
function getApiBaseUrl() {
    return process.env['GITHUB_API_URL'] || 'https://api.github.com';
}
exports.getApiBaseUrl = getApiBaseUrl;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 30:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOctokitOptions = exports.GitHub = exports.context = void 0;
const Context = __importStar(__nccwpck_require__(53));
const Utils = __importStar(__nccwpck_require__(914));
// octokit + plugins
const core_1 = __nccwpck_require__(762);
const plugin_rest_endpoint_methods_1 = __nccwpck_require__(44);
const plugin_paginate_rest_1 = __nccwpck_require__(193);
exports.context = new Context.Context();
const baseUrl = Utils.getApiBaseUrl();
const defaults = {
    baseUrl,
    request: {
        agent: Utils.getProxyAgent(baseUrl)
    }
};
exports.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(defaults);
/**
 * Convience function to correctly format Octokit Options to pass into the constructor.
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokitOptions(token, options) {
    const opts = Object.assign({}, options || {}); // Shallow clone - don't mutate the object provided by the caller
    // Auth
    const auth = Utils.getAuthString(token, opts);
    if (auth) {
        opts.auth = auth;
    }
    return opts;
}
exports.getOctokitOptions = getOctokitOptions;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(605);
const https = __nccwpck_require__(211);
const pm = __nccwpck_require__(443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 334:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

async function auth(token) {
  const tokenType = token.split(/\./).length === 3 ? "app" : /^v\d+\./.test(token) ? "installation" : "oauth";
  return {
    type: "token",
    token: token,
    tokenType
  };
}

/**
 * Prefix token for usage in the Authorization header
 *
 * @param token OAuth token or JSON Web Token
 */
function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }

  return `token ${token}`;
}

async function hook(token, request, route, parameters) {
  const endpoint = request.endpoint.merge(route, parameters);
  endpoint.headers.authorization = withAuthorizationPrefix(token);
  return request(endpoint);
}

const createTokenAuth = function createTokenAuth(token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }

  if (typeof token !== "string") {
    throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
  }

  token = token.replace(/^(token|bearer) +/i, "");
  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token)
  });
};

exports.createTokenAuth = createTokenAuth;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 762:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var universalUserAgent = __nccwpck_require__(429);
var beforeAfterHook = __nccwpck_require__(682);
var request = __nccwpck_require__(234);
var graphql = __nccwpck_require__(668);
var authToken = __nccwpck_require__(334);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const VERSION = "3.5.1";

const _excluded = ["authStrategy"];
class Octokit {
  constructor(options = {}) {
    const hook = new beforeAfterHook.Collection();
    const requestDefaults = {
      baseUrl: request.request.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, options.request, {
        // @ts-ignore internal usage only, no need to type
        hook: hook.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    }; // prepend default user agent with `options.userAgent` if set

    requestDefaults.headers["user-agent"] = [options.userAgent, `octokit-core.js/${VERSION} ${universalUserAgent.getUserAgent()}`].filter(Boolean).join(" ");

    if (options.baseUrl) {
      requestDefaults.baseUrl = options.baseUrl;
    }

    if (options.previews) {
      requestDefaults.mediaType.previews = options.previews;
    }

    if (options.timeZone) {
      requestDefaults.headers["time-zone"] = options.timeZone;
    }

    this.request = request.request.defaults(requestDefaults);
    this.graphql = graphql.withCustomRequest(this.request).defaults(requestDefaults);
    this.log = Object.assign({
      debug: () => {},
      info: () => {},
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    }, options.log);
    this.hook = hook; // (1) If neither `options.authStrategy` nor `options.auth` are set, the `octokit` instance
    //     is unauthenticated. The `this.auth()` method is a no-op and no request hook is registered.
    // (2) If only `options.auth` is set, use the default token authentication strategy.
    // (3) If `options.authStrategy` is set then use it and pass in `options.auth`. Always pass own request as many strategies accept a custom request instance.
    // TODO: type `options.auth` based on `options.authStrategy`.

    if (!options.authStrategy) {
      if (!options.auth) {
        // (1)
        this.auth = async () => ({
          type: "unauthenticated"
        });
      } else {
        // (2)
        const auth = authToken.createTokenAuth(options.auth); // @ts-ignore  ¯\_(ツ)_/¯

        hook.wrap("request", auth.hook);
        this.auth = auth;
      }
    } else {
      const {
        authStrategy
      } = options,
            otherOptions = _objectWithoutProperties(options, _excluded);

      const auth = authStrategy(Object.assign({
        request: this.request,
        log: this.log,
        // we pass the current octokit instance as well as its constructor options
        // to allow for authentication strategies that return a new octokit instance
        // that shares the same internal state as the current one. The original
        // requirement for this was the "event-octokit" authentication strategy
        // of https://github.com/probot/octokit-auth-probot.
        octokit: this,
        octokitOptions: otherOptions
      }, options.auth)); // @ts-ignore  ¯\_(ツ)_/¯

      hook.wrap("request", auth.hook);
      this.auth = auth;
    } // apply plugins
    // https://stackoverflow.com/a/16345172


    const classConstructor = this.constructor;
    classConstructor.plugins.forEach(plugin => {
      Object.assign(this, plugin(this, options));
    });
  }

  static defaults(defaults) {
    const OctokitWithDefaults = class extends this {
      constructor(...args) {
        const options = args[0] || {};

        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }

        super(Object.assign({}, defaults, options, options.userAgent && defaults.userAgent ? {
          userAgent: `${options.userAgent} ${defaults.userAgent}`
        } : null));
      }

    };
    return OctokitWithDefaults;
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */


  static plugin(...newPlugins) {
    var _a;

    const currentPlugins = this.plugins;
    const NewOctokit = (_a = class extends this {}, _a.plugins = currentPlugins.concat(newPlugins.filter(plugin => !currentPlugins.includes(plugin))), _a);
    return NewOctokit;
  }

}
Octokit.VERSION = VERSION;
Octokit.plugins = [];

exports.Octokit = Octokit;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 440:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var isPlainObject = __nccwpck_require__(558);
var universalUserAgent = __nccwpck_require__(429);

function lowercaseKeys(object) {
  if (!object) {
    return {};
  }

  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}

function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach(key => {
    if (isPlainObject.isPlainObject(options[key])) {
      if (!(key in defaults)) Object.assign(result, {
        [key]: options[key]
      });else result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, {
        [key]: options[key]
      });
    }
  });
  return result;
}

function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }

  return obj;
}

function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? {
      method,
      url
    } : {
      url: method
    }, options);
  } else {
    options = Object.assign({}, route);
  } // lowercase header names before merging with defaults to avoid duplicates


  options.headers = lowercaseKeys(options.headers); // remove properties with undefined values before merging

  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options); // mediaType.previews arrays are merged, instead of overwritten

  if (defaults && defaults.mediaType.previews.length) {
    mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(preview => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
  }

  mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map(preview => preview.replace(/-preview/, ""));
  return mergedOptions;
}

function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);

  if (names.length === 0) {
    return url;
  }

  return url + separator + names.map(name => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }

    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}

const urlVariableRegex = /\{[^}]+\}/g;

function removeNonChars(variableName) {
  return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
}

function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);

  if (!matches) {
    return [];
  }

  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
}

function omit(object, keysToOmit) {
  return Object.keys(object).filter(option => !keysToOmit.includes(option)).reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
}

// Based on https://github.com/bramstein/url-template, licensed under BSD
// TODO: create separate package.
//
// Copyright (c) 2012-2014, Bram Stein
// All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//  1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//  3. The name of the author may not be used to endorse or promote products
//     derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* istanbul ignore file */
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }

    return part;
  }).join("");
}

function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);

  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}

function getValues(context, operator, key, modifier) {
  var value = context[key],
      result = [];

  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();

      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }

      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];

        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            tmp.push(encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }

        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }

  return result;
}

function parseUrl(template) {
  return {
    expand: expand.bind(null, template)
  };
}

function expand(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
    if (expression) {
      let operator = "";
      const values = [];

      if (operators.indexOf(expression.charAt(0)) !== -1) {
        operator = expression.charAt(0);
        expression = expression.substr(1);
      }

      expression.split(/,/g).forEach(function (variable) {
        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
        values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
      });

      if (operator && operator !== "+") {
        var separator = ",";

        if (operator === "?") {
          separator = "&";
        } else if (operator !== "#") {
          separator = operator;
        }

        return (values.length !== 0 ? operator : "") + values.join(separator);
      } else {
        return values.join(",");
      }
    } else {
      return encodeReserved(literal);
    }
  });
}

function parse(options) {
  // https://fetch.spec.whatwg.org/#methods
  let method = options.method.toUpperCase(); // replace :varname with {varname} to make it RFC 6570 compatible

  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]); // extract variable names from URL to calculate remaining variables later

  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);

  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }

  const omittedParameters = Object.keys(options).filter(option => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);

  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      // e.g. application/vnd.github.v3+json => application/vnd.github.v3.raw
      headers.accept = headers.accept.split(/,/).map(preview => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
    }

    if (options.mediaType.previews.length) {
      const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
      headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map(preview => {
        const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
        return `application/vnd.github.${preview}-preview${format}`;
      }).join(",");
    }
  } // for GET/HEAD requests, set URL query parameters from remaining parameters
  // for PATCH/POST/PUT/DELETE requests, set request body from remaining parameters


  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      } else {
        headers["content-length"] = 0;
      }
    }
  } // default content-type for JSON if body is set


  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  } // GitHub expects 'content-length: 0' header for PUT/PATCH requests without body.
  // fetch does not allow to set `content-length` header, but we can set body to an empty string


  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  } // Only return body/request keys if present


  return Object.assign({
    method,
    url,
    headers
  }, typeof body !== "undefined" ? {
    body
  } : null, options.request ? {
    request: options.request
  } : null);
}

function endpointWithDefaults(defaults, route, options) {
  return parse(merge(defaults, route, options));
}

function withDefaults(oldDefaults, newDefaults) {
  const DEFAULTS = merge(oldDefaults, newDefaults);
  const endpoint = endpointWithDefaults.bind(null, DEFAULTS);
  return Object.assign(endpoint, {
    DEFAULTS,
    defaults: withDefaults.bind(null, DEFAULTS),
    merge: merge.bind(null, DEFAULTS),
    parse
  });
}

const VERSION = "6.0.12";

const userAgent = `octokit-endpoint.js/${VERSION} ${universalUserAgent.getUserAgent()}`; // DEFAULTS has all properties set that EndpointOptions has, except url.
// So we use RequestParameters and add method as additional required property.

const DEFAULTS = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": userAgent
  },
  mediaType: {
    format: "",
    previews: []
  }
};

const endpoint = withDefaults(null, DEFAULTS);

exports.endpoint = endpoint;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 558:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

exports.isPlainObject = isPlainObject;


/***/ }),

/***/ 668:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var request = __nccwpck_require__(234);
var universalUserAgent = __nccwpck_require__(429);

const VERSION = "4.6.4";

class GraphqlError extends Error {
  constructor(request, response) {
    const message = response.data.errors[0].message;
    super(message);
    Object.assign(this, response.data);
    Object.assign(this, {
      headers: response.headers
    });
    this.name = "GraphqlError";
    this.request = request; // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

}

const NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"];
const FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
const GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql(request, query, options) {
  if (options) {
    if (typeof query === "string" && "query" in options) {
      return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
    }

    for (const key in options) {
      if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key)) continue;
      return Promise.reject(new Error(`[@octokit/graphql] "${key}" cannot be used as variable name`));
    }
  }

  const parsedOptions = typeof query === "string" ? Object.assign({
    query
  }, options) : query;
  const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }

    if (!result.variables) {
      result.variables = {};
    }

    result.variables[key] = parsedOptions[key];
    return result;
  }, {}); // workaround for GitHub Enterprise baseUrl set with /api/v3 suffix
  // https://github.com/octokit/auth-app.js/issues/111#issuecomment-657610451

  const baseUrl = parsedOptions.baseUrl || request.endpoint.DEFAULTS.baseUrl;

  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }

  return request(requestOptions).then(response => {
    if (response.data.errors) {
      const headers = {};

      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }

      throw new GraphqlError(requestOptions, {
        headers,
        data: response.data
      });
    }

    return response.data.data;
  });
}

function withDefaults(request$1, newDefaults) {
  const newRequest = request$1.defaults(newDefaults);

  const newApi = (query, options) => {
    return graphql(newRequest, query, options);
  };

  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: request.request.endpoint
  });
}

const graphql$1 = withDefaults(request.request, {
  headers: {
    "user-agent": `octokit-graphql.js/${VERSION} ${universalUserAgent.getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}

exports.graphql = graphql$1;
exports.withCustomRequest = withCustomRequest;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 193:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const VERSION = "2.13.5";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Some “list” response that can be paginated have a different response structure
 *
 * They have a `total_count` key in the response (search also has `incomplete_results`,
 * /installation/repositories also has `repository_selection`), as well as a key with
 * the list of the items which name varies from endpoint to endpoint.
 *
 * Octokit normalizes these responses so that paginated results are always returned following
 * the same structure. One challenge is that if the list response has only one page, no Link
 * header is provided, so this header alone is not sufficient to check wether a response is
 * paginated or not.
 *
 * We check if a "total_count" key is present in the response data, but also make sure that
 * a "url" property is not, as the "Get the combined status for a specific ref" endpoint would
 * otherwise match: https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
 */
function normalizePaginatedListResponse(response) {
  // endpoints can respond with 204 if repository is empty
  if (!response.data) {
    return _objectSpread2(_objectSpread2({}, response), {}, {
      data: []
    });
  }

  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization) return response; // keep the additional properties intact as there is currently no other way
  // to retrieve the same information.

  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;

  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }

  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }

  response.data.total_count = totalCount;
  return response;
}

function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url) return {
          done: true
        };

        try {
          const response = await requestMethod({
            method,
            url,
            headers
          });
          const normalizedResponse = normalizePaginatedListResponse(response); // `response.headers.link` format:
          // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
          // sets `url` to undefined if "next" URL is not present or `link` header is not set

          url = ((normalizedResponse.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
          return {
            value: normalizedResponse
          };
        } catch (error) {
          if (error.status !== 409) throw error;
          url = "";
          return {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }

    })
  };
}

function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = undefined;
  }

  return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
}

function gather(octokit, results, iterator, mapFn) {
  return iterator.next().then(result => {
    if (result.done) {
      return results;
    }

    let earlyExit = false;

    function done() {
      earlyExit = true;
    }

    results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);

    if (earlyExit) {
      return results;
    }

    return gather(octokit, results, iterator, mapFn);
  });
}

const composePaginateRest = Object.assign(paginate, {
  iterator
});

const paginatingEndpoints = ["GET /app/installations", "GET /applications/grants", "GET /authorizations", "GET /enterprises/{enterprise}/actions/permissions/organizations", "GET /enterprises/{enterprise}/actions/runner-groups", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners", "GET /enterprises/{enterprise}/actions/runners", "GET /enterprises/{enterprise}/actions/runners/downloads", "GET /events", "GET /gists", "GET /gists/public", "GET /gists/starred", "GET /gists/{gist_id}/comments", "GET /gists/{gist_id}/commits", "GET /gists/{gist_id}/forks", "GET /installation/repositories", "GET /issues", "GET /marketplace_listing/plans", "GET /marketplace_listing/plans/{plan_id}/accounts", "GET /marketplace_listing/stubbed/plans", "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts", "GET /networks/{owner}/{repo}/events", "GET /notifications", "GET /organizations", "GET /orgs/{org}/actions/permissions/repositories", "GET /orgs/{org}/actions/runner-groups", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners", "GET /orgs/{org}/actions/runners", "GET /orgs/{org}/actions/runners/downloads", "GET /orgs/{org}/actions/secrets", "GET /orgs/{org}/actions/secrets/{secret_name}/repositories", "GET /orgs/{org}/blocks", "GET /orgs/{org}/credential-authorizations", "GET /orgs/{org}/events", "GET /orgs/{org}/failed_invitations", "GET /orgs/{org}/hooks", "GET /orgs/{org}/installations", "GET /orgs/{org}/invitations", "GET /orgs/{org}/invitations/{invitation_id}/teams", "GET /orgs/{org}/issues", "GET /orgs/{org}/members", "GET /orgs/{org}/migrations", "GET /orgs/{org}/migrations/{migration_id}/repositories", "GET /orgs/{org}/outside_collaborators", "GET /orgs/{org}/projects", "GET /orgs/{org}/public_members", "GET /orgs/{org}/repos", "GET /orgs/{org}/team-sync/groups", "GET /orgs/{org}/teams", "GET /orgs/{org}/teams/{team_slug}/discussions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/invitations", "GET /orgs/{org}/teams/{team_slug}/members", "GET /orgs/{org}/teams/{team_slug}/projects", "GET /orgs/{org}/teams/{team_slug}/repos", "GET /orgs/{org}/teams/{team_slug}/team-sync/group-mappings", "GET /orgs/{org}/teams/{team_slug}/teams", "GET /projects/columns/{column_id}/cards", "GET /projects/{project_id}/collaborators", "GET /projects/{project_id}/columns", "GET /repos/{owner}/{repo}/actions/artifacts", "GET /repos/{owner}/{repo}/actions/runners", "GET /repos/{owner}/{repo}/actions/runners/downloads", "GET /repos/{owner}/{repo}/actions/runs", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs", "GET /repos/{owner}/{repo}/actions/secrets", "GET /repos/{owner}/{repo}/actions/workflows", "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs", "GET /repos/{owner}/{repo}/assignees", "GET /repos/{owner}/{repo}/branches", "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations", "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs", "GET /repos/{owner}/{repo}/code-scanning/alerts", "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", "GET /repos/{owner}/{repo}/code-scanning/analyses", "GET /repos/{owner}/{repo}/collaborators", "GET /repos/{owner}/{repo}/comments", "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/commits", "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments", "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", "GET /repos/{owner}/{repo}/commits/{ref}/check-runs", "GET /repos/{owner}/{repo}/commits/{ref}/check-suites", "GET /repos/{owner}/{repo}/commits/{ref}/statuses", "GET /repos/{owner}/{repo}/contributors", "GET /repos/{owner}/{repo}/deployments", "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses", "GET /repos/{owner}/{repo}/events", "GET /repos/{owner}/{repo}/forks", "GET /repos/{owner}/{repo}/git/matching-refs/{ref}", "GET /repos/{owner}/{repo}/hooks", "GET /repos/{owner}/{repo}/invitations", "GET /repos/{owner}/{repo}/issues", "GET /repos/{owner}/{repo}/issues/comments", "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/issues/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/comments", "GET /repos/{owner}/{repo}/issues/{issue_number}/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/labels", "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", "GET /repos/{owner}/{repo}/keys", "GET /repos/{owner}/{repo}/labels", "GET /repos/{owner}/{repo}/milestones", "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels", "GET /repos/{owner}/{repo}/notifications", "GET /repos/{owner}/{repo}/pages/builds", "GET /repos/{owner}/{repo}/projects", "GET /repos/{owner}/{repo}/pulls", "GET /repos/{owner}/{repo}/pulls/comments", "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments", "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits", "GET /repos/{owner}/{repo}/pulls/{pull_number}/files", "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments", "GET /repos/{owner}/{repo}/releases", "GET /repos/{owner}/{repo}/releases/{release_id}/assets", "GET /repos/{owner}/{repo}/secret-scanning/alerts", "GET /repos/{owner}/{repo}/stargazers", "GET /repos/{owner}/{repo}/subscribers", "GET /repos/{owner}/{repo}/tags", "GET /repos/{owner}/{repo}/teams", "GET /repositories", "GET /repositories/{repository_id}/environments/{environment_name}/secrets", "GET /scim/v2/enterprises/{enterprise}/Groups", "GET /scim/v2/enterprises/{enterprise}/Users", "GET /scim/v2/organizations/{org}/Users", "GET /search/code", "GET /search/commits", "GET /search/issues", "GET /search/labels", "GET /search/repositories", "GET /search/topics", "GET /search/users", "GET /teams/{team_id}/discussions", "GET /teams/{team_id}/discussions/{discussion_number}/comments", "GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /teams/{team_id}/discussions/{discussion_number}/reactions", "GET /teams/{team_id}/invitations", "GET /teams/{team_id}/members", "GET /teams/{team_id}/projects", "GET /teams/{team_id}/repos", "GET /teams/{team_id}/team-sync/group-mappings", "GET /teams/{team_id}/teams", "GET /user/blocks", "GET /user/emails", "GET /user/followers", "GET /user/following", "GET /user/gpg_keys", "GET /user/installations", "GET /user/installations/{installation_id}/repositories", "GET /user/issues", "GET /user/keys", "GET /user/marketplace_purchases", "GET /user/marketplace_purchases/stubbed", "GET /user/memberships/orgs", "GET /user/migrations", "GET /user/migrations/{migration_id}/repositories", "GET /user/orgs", "GET /user/public_emails", "GET /user/repos", "GET /user/repository_invitations", "GET /user/starred", "GET /user/subscriptions", "GET /user/teams", "GET /users", "GET /users/{username}/events", "GET /users/{username}/events/orgs/{org}", "GET /users/{username}/events/public", "GET /users/{username}/followers", "GET /users/{username}/following", "GET /users/{username}/gists", "GET /users/{username}/gpg_keys", "GET /users/{username}/keys", "GET /users/{username}/orgs", "GET /users/{username}/projects", "GET /users/{username}/received_events", "GET /users/{username}/received_events/public", "GET /users/{username}/repos", "GET /users/{username}/starred", "GET /users/{username}/subscriptions"];

function isPaginatingEndpoint(arg) {
  if (typeof arg === "string") {
    return paginatingEndpoints.includes(arg);
  } else {
    return false;
  }
}

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */

function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
paginateRest.VERSION = VERSION;

exports.composePaginateRest = composePaginateRest;
exports.isPaginatingEndpoint = isPaginatingEndpoint;
exports.paginateRest = paginateRest;
exports.paginatingEndpoints = paginatingEndpoints;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 44:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const Endpoints = {
  actions: {
    addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    approveWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"],
    cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
    createOrUpdateEnvironmentSecret: ["PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
    createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
    createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
    deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    deleteEnvironmentSecret: ["DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
    deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
    downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
    downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
    downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
    getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
    getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getEnvironmentPublicKey: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"],
    getEnvironmentSecret: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
    getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getPendingDeploymentsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    getRepoPermissions: ["GET /repos/{owner}/{repo}/actions/permissions", {}, {
      renamed: ["actions", "getGithubActionsPermissionsRepository"]
    }],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getReviewsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
    getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listEnvironmentSecrets: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets"],
    listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
    listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
    listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    reviewPendingDeploymentsForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
    setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
    setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
    setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
    checkToken: ["POST /applications/{client_id}/token"],
    createContentAttachment: ["POST /content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createContentAttachmentForRepo: ["POST /repos/{owner}/{repo}/content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
    getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
    listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
    removeRepoFromInstallation: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
    getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
    getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
    setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
    getAlert: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}", {}, {
      renamedParameters: {
        alert_id: "alert_number"
      }
    }],
    getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
    getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
    listAlertInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listAlertsInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", {}, {
      renamed: ["codeScanning", "listAlertInstances"]
    }],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getConductCode: ["GET /codes_of_conduct/{key}", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getForRepo: ["GET /repos/{owner}/{repo}/community/code_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }]
  },
  emojis: {
    get: ["GET /emojis"]
  },
  enterpriseAdmin: {
    disableSelectedOrganizationGithubActionsEnterprise: ["DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    enableSelectedOrganizationGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    getAllowedActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/selected-actions"],
    getGithubActionsPermissionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions"],
    listSelectedOrganizationsEnabledGithubActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/organizations"],
    setAllowedActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions"],
    setSelectedOrganizationsEnabledGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations"]
  },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: ["GET /user/interaction-limits", {}, {
      renamed: ["interactions", "getRestrictionsForAuthenticatedUser"]
    }],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
    removeRestrictionsForYourPublicRepos: ["DELETE /user/interaction-limits", {}, {
      renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"]
    }],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: ["PUT /user/interaction-limits", {}, {
      renamed: ["interactions", "setRestrictionsForAuthenticatedUser"]
    }]
  },
  issues: {
    addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", {
      mediaType: {
        previews: ["mockingbird"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: ["POST /markdown/raw", {
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    }]
  },
  meta: {
    get: ["GET /meta"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
    deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
    getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForUser: ["GET /user/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
    setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: ["PUT /repos/{owner}/{repo}/import"],
    unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    updateImport: ["PATCH /repos/{owner}/{repo}/import"]
  },
  orgs: {
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createWebhook: ["POST /orgs/{org}/hooks"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    get: ["GET /orgs/{org}"],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
    removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  packages: {
    deletePackageForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}"],
    deletePackageForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}"],
    deletePackageVersionForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    deletePackageVersionForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getAllPackageVersionsForAPackageOwnedByAnOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"]
    }],
    getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"]
    }],
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions"],
    getPackageForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}"],
    getPackageForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}"],
    getPackageForUser: ["GET /users/{username}/packages/{package_type}/{package_name}"],
    getPackageVersionForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    restorePackageForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageVersionForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
    restorePackageVersionForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createCard: ["POST /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createColumn: ["POST /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForAuthenticatedUser: ["POST /user/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForOrg: ["POST /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForRepo: ["POST /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    delete: ["DELETE /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteColumn: ["DELETE /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    get: ["GET /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getCard: ["GET /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getColumn: ["GET /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getPermissionForUser: ["GET /projects/{project_id}/collaborators/{username}/permission", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCards: ["GET /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCollaborators: ["GET /projects/{project_id}/collaborators", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listColumns: ["GET /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForRepo: ["GET /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForUser: ["GET /users/{username}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveColumn: ["POST /projects/columns/{column_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    removeCollaborator: ["DELETE /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    update: ["PATCH /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateCard: ["PATCH /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateColumn: ["PATCH /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch", {
      mediaType: {
        previews: ["lydian"]
      }
    }],
    updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
  },
  rateLimit: {
    get: ["GET /rate_limit"]
  },
  reactions: {
    createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForRelease: ["POST /repos/{owner}/{repo}/releases/{release_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteLegacy: ["DELETE /reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }, {
      deprecated: "octokit.rest.reactions.deleteLegacy() is deprecated, see https://docs.github.com/rest/reference/reactions/#delete-a-reaction-legacy"
    }],
    listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }]
  },
  repos: {
    acceptInvitation: ["PATCH /user/repository_invitations/{invitation_id}"],
    addAppAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    addTeamAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    addUserAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    compareCommitsWithBasehead: ["GET /repos/{owner}/{repo}/compare/{basehead}"],
    createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate", {
      mediaType: {
        previews: ["baptiste"]
      }
    }],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: ["DELETE /user/repository_invitations/{invitation_id}"],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    deleteAnEnvironment: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}"],
    deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    downloadArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}", {}, {
      renamed: ["repos", "downloadZipballArchive"]
    }],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
    getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
    getEnvironment: ["GET /repos/{owner}/{repo}/environments/{environment_name}"],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    removeAppAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
    removeStatusCheckContexts: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    removeTeamAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    removeUserAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    setAppAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    setStatusCheckContexts: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    setTeamAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    setUserAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
    updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    updateStatusCheckPotection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks", {}, {
      renamed: ["repos", "updateStatusCheckProtection"]
    }],
    updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", {
      baseUrl: "https://uploads.github.com"
    }]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits", {
      mediaType: {
        previews: ["cloak"]
      }
    }],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    addOrUpdateProjectPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    checkPermissionsForProjectInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    removeProjectInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
    removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: ["POST /user/emails"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: ["POST /user/keys"],
    deleteEmailForAuthenticated: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: ["DELETE /user/keys/{key_id}"],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: ["GET /user/keys/{key_id}"],
    list: ["GET /users"],
    listBlockedByAuthenticated: ["GET /user/blocks"],
    listEmailsForAuthenticated: ["GET /user/emails"],
    listFollowedByAuthenticated: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: ["GET /user/keys"],
    setPrimaryEmailVisibilityForAuthenticated: ["PATCH /user/email/visibility"],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
};

const VERSION = "5.3.1";

function endpointsToMethods(octokit, endpointsMap) {
  const newMethods = {};

  for (const [scope, endpoints] of Object.entries(endpointsMap)) {
    for (const [methodName, endpoint] of Object.entries(endpoints)) {
      const [route, defaults, decorations] = endpoint;
      const [method, url] = route.split(/ /);
      const endpointDefaults = Object.assign({
        method,
        url
      }, defaults);

      if (!newMethods[scope]) {
        newMethods[scope] = {};
      }

      const scopeMethods = newMethods[scope];

      if (decorations) {
        scopeMethods[methodName] = decorate(octokit, scope, methodName, endpointDefaults, decorations);
        continue;
      }

      scopeMethods[methodName] = octokit.request.defaults(endpointDefaults);
    }
  }

  return newMethods;
}

function decorate(octokit, scope, methodName, defaults, decorations) {
  const requestWithDefaults = octokit.request.defaults(defaults);
  /* istanbul ignore next */

  function withDecorations(...args) {
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
    let options = requestWithDefaults.endpoint.merge(...args); // There are currently no other decorations than `.mapToData`

    if (decorations.mapToData) {
      options = Object.assign({}, options, {
        data: options[decorations.mapToData],
        [decorations.mapToData]: undefined
      });
      return requestWithDefaults(options);
    }

    if (decorations.renamed) {
      const [newScope, newMethodName] = decorations.renamed;
      octokit.log.warn(`octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`);
    }

    if (decorations.deprecated) {
      octokit.log.warn(decorations.deprecated);
    }

    if (decorations.renamedParameters) {
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
      const options = requestWithDefaults.endpoint.merge(...args);

      for (const [name, alias] of Object.entries(decorations.renamedParameters)) {
        if (name in options) {
          octokit.log.warn(`"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`);

          if (!(alias in options)) {
            options[alias] = options[name];
          }

          delete options[name];
        }
      }

      return requestWithDefaults(options);
    } // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488


    return requestWithDefaults(...args);
  }

  return Object.assign(withDecorations, requestWithDefaults);
}

function restEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return {
    rest: api
  };
}
restEndpointMethods.VERSION = VERSION;
function legacyRestEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return _objectSpread2(_objectSpread2({}, api), {}, {
    rest: api
  });
}
legacyRestEndpointMethods.VERSION = VERSION;

exports.legacyRestEndpointMethods = legacyRestEndpointMethods;
exports.restEndpointMethods = restEndpointMethods;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 537:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var deprecation = __nccwpck_require__(481);
var once = _interopDefault(__nccwpck_require__(223));

const logOnceCode = once(deprecation => console.warn(deprecation));
const logOnceHeaders = once(deprecation => console.warn(deprecation));
/**
 * Error with extra properties to help with debugging
 */

class RequestError extends Error {
  constructor(message, statusCode, options) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = "HttpError";
    this.status = statusCode;
    let headers;

    if ("headers" in options && typeof options.headers !== "undefined") {
      headers = options.headers;
    }

    if ("response" in options) {
      this.response = options.response;
      headers = options.response.headers;
    } // redact request credentials without mutating original request options


    const requestCopy = Object.assign({}, options.request);

    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
      });
    }

    requestCopy.url = requestCopy.url // client_id & client_secret can be passed as URL query parameters to increase rate limit
    // see https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications
    .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]") // OAuth tokens can be passed as URL query parameters, although it is not recommended
    // see https://developer.github.com/v3/#oauth2-token-sent-in-a-header
    .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy; // deprecations

    Object.defineProperty(this, "code", {
      get() {
        logOnceCode(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
        return statusCode;
      }

    });
    Object.defineProperty(this, "headers", {
      get() {
        logOnceHeaders(new deprecation.Deprecation("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."));
        return headers || {};
      }

    });
  }

}

exports.RequestError = RequestError;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 234:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var endpoint = __nccwpck_require__(440);
var universalUserAgent = __nccwpck_require__(429);
var isPlainObject = __nccwpck_require__(62);
var nodeFetch = _interopDefault(__nccwpck_require__(467));
var requestError = __nccwpck_require__(537);

const VERSION = "5.6.0";

function getBufferResponse(response) {
  return response.arrayBuffer();
}

function fetchWrapper(requestOptions) {
  const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;

  if (isPlainObject.isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  let headers = {};
  let status;
  let url;
  const fetch = requestOptions.request && requestOptions.request.fetch || nodeFetch;
  return fetch(requestOptions.url, Object.assign({
    method: requestOptions.method,
    body: requestOptions.body,
    headers: requestOptions.headers,
    redirect: requestOptions.redirect
  }, // `requestOptions.request.agent` type is incompatible
  // see https://github.com/octokit/types.ts/pull/264
  requestOptions.request)).then(async response => {
    url = response.url;
    status = response.status;

    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }

    if ("deprecation" in headers) {
      const matches = headers.link && headers.link.match(/<([^>]+)>; rel="deprecation"/);
      const deprecationLink = matches && matches.pop();
      log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
    }

    if (status === 204 || status === 205) {
      return;
    } // GitHub API returns 200 for HEAD requests


    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }

      throw new requestError.RequestError(response.statusText, status, {
        response: {
          url,
          status,
          headers,
          data: undefined
        },
        request: requestOptions
      });
    }

    if (status === 304) {
      throw new requestError.RequestError("Not modified", status, {
        response: {
          url,
          status,
          headers,
          data: await getResponseData(response)
        },
        request: requestOptions
      });
    }

    if (status >= 400) {
      const data = await getResponseData(response);
      const error = new requestError.RequestError(toErrorMessage(data), status, {
        response: {
          url,
          status,
          headers,
          data
        },
        request: requestOptions
      });
      throw error;
    }

    return getResponseData(response);
  }).then(data => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch(error => {
    if (error instanceof requestError.RequestError) throw error;
    throw new requestError.RequestError(error.message, 500, {
      request: requestOptions
    });
  });
}

async function getResponseData(response) {
  const contentType = response.headers.get("content-type");

  if (/application\/json/.test(contentType)) {
    return response.json();
  }

  if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
    return response.text();
  }

  return getBufferResponse(response);
}

function toErrorMessage(data) {
  if (typeof data === "string") return data; // istanbul ignore else - just in case

  if ("message" in data) {
    if (Array.isArray(data.errors)) {
      return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}`;
    }

    return data.message;
  } // istanbul ignore next - just in case


  return `Unknown error: ${JSON.stringify(data)}`;
}

function withDefaults(oldEndpoint, newDefaults) {
  const endpoint = oldEndpoint.defaults(newDefaults);

  const newApi = function (route, parameters) {
    const endpointOptions = endpoint.merge(route, parameters);

    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint.parse(endpointOptions));
    }

    const request = (route, parameters) => {
      return fetchWrapper(endpoint.parse(endpoint.merge(route, parameters)));
    };

    Object.assign(request, {
      endpoint,
      defaults: withDefaults.bind(null, endpoint)
    });
    return endpointOptions.request.hook(request, endpointOptions);
  };

  return Object.assign(newApi, {
    endpoint,
    defaults: withDefaults.bind(null, endpoint)
  });
}

const request = withDefaults(endpoint.endpoint, {
  headers: {
    "user-agent": `octokit-request.js/${VERSION} ${universalUserAgent.getUserAgent()}`
  }
});

exports.request = request;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 62:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

exports.isPlainObject = isPlainObject;


/***/ }),

/***/ 682:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var register = __nccwpck_require__(670)
var addHook = __nccwpck_require__(549)
var removeHook = __nccwpck_require__(819)

// bind with array of arguments: https://stackoverflow.com/a/21792913
var bind = Function.bind
var bindable = bind.bind(bind)

function bindApi (hook, state, name) {
  var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state])
  hook.api = { remove: removeHookRef }
  hook.remove = removeHookRef

  ;['before', 'error', 'after', 'wrap'].forEach(function (kind) {
    var args = name ? [state, kind, name] : [state, kind]
    hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args)
  })
}

function HookSingular () {
  var singularHookName = 'h'
  var singularHookState = {
    registry: {}
  }
  var singularHook = register.bind(null, singularHookState, singularHookName)
  bindApi(singularHook, singularHookState, singularHookName)
  return singularHook
}

function HookCollection () {
  var state = {
    registry: {}
  }

  var hook = register.bind(null, state)
  bindApi(hook, state)

  return hook
}

var collectionHookDeprecationMessageDisplayed = false
function Hook () {
  if (!collectionHookDeprecationMessageDisplayed) {
    console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4')
    collectionHookDeprecationMessageDisplayed = true
  }
  return HookCollection()
}

Hook.Singular = HookSingular.bind()
Hook.Collection = HookCollection.bind()

module.exports = Hook
// expose constructors as a named property for TypeScript
module.exports.Hook = Hook
module.exports.Singular = Hook.Singular
module.exports.Collection = Hook.Collection


/***/ }),

/***/ 549:
/***/ ((module) => {

module.exports = addHook;

function addHook(state, kind, name, hook) {
  var orig = hook;
  if (!state.registry[name]) {
    state.registry[name] = [];
  }

  if (kind === "before") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(orig.bind(null, options))
        .then(method.bind(null, options));
    };
  }

  if (kind === "after") {
    hook = function (method, options) {
      var result;
      return Promise.resolve()
        .then(method.bind(null, options))
        .then(function (result_) {
          result = result_;
          return orig(result, options);
        })
        .then(function () {
          return result;
        });
    };
  }

  if (kind === "error") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(method.bind(null, options))
        .catch(function (error) {
          return orig(error, options);
        });
    };
  }

  state.registry[name].push({
    hook: hook,
    orig: orig,
  });
}


/***/ }),

/***/ 670:
/***/ ((module) => {

module.exports = register;

function register(state, name, method, options) {
  if (typeof method !== "function") {
    throw new Error("method for before hook must be a function");
  }

  if (!options) {
    options = {};
  }

  if (Array.isArray(name)) {
    return name.reverse().reduce(function (callback, name) {
      return register.bind(null, state, name, callback, options);
    }, method)();
  }

  return Promise.resolve().then(function () {
    if (!state.registry[name]) {
      return method(options);
    }

    return state.registry[name].reduce(function (method, registered) {
      return registered.hook.bind(null, method, options);
    }, method)();
  });
}


/***/ }),

/***/ 819:
/***/ ((module) => {

module.exports = removeHook;

function removeHook(state, name, method) {
  if (!state.registry[name]) {
    return;
  }

  var index = state.registry[name]
    .map(function (registered) {
      return registered.orig;
    })
    .indexOf(method);

  if (index === -1) {
    return;
  }

  state.registry[name].splice(index, 1);
}


/***/ }),

/***/ 737:
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_535__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_535__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_535__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_535__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__nested_webpack_require_535__.d = function(exports, name, getter) {
/******/ 		if(!__nested_webpack_require_535__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__nested_webpack_require_535__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__nested_webpack_require_535__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __nested_webpack_require_535__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__nested_webpack_require_535__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __nested_webpack_require_535__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nested_webpack_require_535__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__nested_webpack_require_535__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__nested_webpack_require_535__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_535__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_535__(__nested_webpack_require_535__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __nested_webpack_require_4000__) {

var dayjs = __nested_webpack_require_4000__(2);

function ParsedResult(result) {
  result = result || {};
  this.ref = result.ref;
  this.index = result.index;
  this.text = result.text;
  this.tags = result.tags || {};
  this.start = new ParsedComponents(result.start, result.ref);

  if (result.end) {
    this.end = new ParsedComponents(result.end, result.ref);
  }
}

ParsedResult.prototype.clone = function () {
  var result = new ParsedResult(this);
  result.tags = JSON.parse(JSON.stringify(this.tags));
  result.start = this.start.clone();

  if (this.end) {
    result.end = this.end.clone();
  }

  return result;
};

ParsedResult.prototype.date = function () {
  return this.start.date();
};

ParsedResult.prototype.hasPossibleDates = function () {
  return this.start.isPossibleDate() && (!this.end || this.end.isPossibleDate());
};

ParsedResult.prototype.isOnlyWeekday = function () {
  return this.start.isOnlyWeekdayComponent();
};

ParsedResult.prototype.isOnlyDayMonth = function () {
  return this.start.isOnlyDayMonthComponent();
};

function ParsedComponents(components, ref) {
  this.knownValues = {};
  this.impliedValues = {};

  if (components) {
    for (var key in components) {
      this.knownValues[key] = components[key];
    }
  }

  if (ref) {
    ref = dayjs(ref);
    this.imply('day', ref.date());
    this.imply('month', ref.month() + 1);
    this.imply('year', ref.year());
  }

  this.imply('hour', 12);
  this.imply('minute', 0);
  this.imply('second', 0);
  this.imply('millisecond', 0);
}

ParsedComponents.prototype.clone = function () {
  var component = new ParsedComponents();
  component.knownValues = JSON.parse(JSON.stringify(this.knownValues));
  component.impliedValues = JSON.parse(JSON.stringify(this.impliedValues));
  return component;
};

ParsedComponents.prototype.get = function (component, value) {
  if (component in this.knownValues) return this.knownValues[component];
  if (component in this.impliedValues) return this.impliedValues[component];
};

ParsedComponents.prototype.assign = function (component, value) {
  this.knownValues[component] = value;
  delete this.impliedValues[component];
};

ParsedComponents.prototype.imply = function (component, value) {
  if (component in this.knownValues) return;
  this.impliedValues[component] = value;
};

ParsedComponents.prototype.isCertain = function (component) {
  return component in this.knownValues;
};

ParsedComponents.prototype.isOnlyWeekdayComponent = function () {
  return this.isCertain('weekday') && !this.isCertain('day') && !this.isCertain('month');
};

ParsedComponents.prototype.isOnlyDayMonthComponent = function () {
  return this.isCertain('day') && this.isCertain('month') && !this.isCertain('year');
};

ParsedComponents.prototype.isPossibleDate = function () {
  var dateMoment = this.dayjs();

  if (this.isCertain('timezoneOffset')) {
    var adjustTimezoneOffset = this.get('timezoneOffset') - dateMoment.utcOffset();
    dateMoment = dateMoment.add(adjustTimezoneOffset, 'minutes');
  }

  if (dateMoment.get('year') != this.get('year')) return false;
  if (dateMoment.get('month') != this.get('month') - 1) return false;
  if (dateMoment.get('date') != this.get('day')) return false;
  if (dateMoment.get('hour') != this.get('hour')) return false;
  if (dateMoment.get('minute') != this.get('minute')) return false;
  return true;
};

ParsedComponents.prototype.date = function () {
  var result = this.dayjs();
  return result.toDate();
};

ParsedComponents.prototype.dayjs = function () {
  var result = dayjs();
  result = result.year(this.get('year'));
  result = result.month(this.get('month') - 1);
  result = result.date(this.get('day'));
  result = result.hour(this.get('hour'));
  result = result.minute(this.get('minute'));
  result = result.second(this.get('second'));
  result = result.millisecond(this.get('millisecond')); // Javascript Date Object return minus timezone offset

  var currentTimezoneOffset = result.utcOffset();
  var targetTimezoneOffset = this.get('timezoneOffset') !== undefined ? this.get('timezoneOffset') : currentTimezoneOffset;
  var adjustTimezoneOffset = targetTimezoneOffset - currentTimezoneOffset;
  result = result.add(-adjustTimezoneOffset, 'minute');
  return result;
};

ParsedComponents.prototype.moment = function () {
  // Keep for compatibility
  return this.dayjs();
};

exports.ParsedComponents = ParsedComponents;
exports.ParsedResult = ParsedResult;

/***/ }),
/* 1 */
/***/ (function(module, exports, __nested_webpack_require_8510__) {

var dayjs = __nested_webpack_require_8510__(2);

exports.Parser = function (config) {
  config = config || {};
  var strictMode = config.strict;

  this.isStrictMode = function () {
    return strictMode == true;
  };

  this.pattern = function () {
    return /./i;
  };

  this.extract = function (text, ref, match, opt) {
    return null;
  };

  this.execute = function (text, ref, opt) {
    var results = [];
    var regex = this.pattern();
    var remainingText = text;
    var match = regex.exec(remainingText);

    while (match) {
      // Calculate match index on the full text;
      match.index += text.length - remainingText.length;
      var result = this.extract(text, ref, match, opt);

      if (result) {
        // If success, start from the end of the result
        remainingText = text.substring(result.index + result.text.length);

        if (!this.isStrictMode() || result.hasPossibleDates()) {
          results.push(result);
        }
      } else {
        // If fail, move on by 1
        remainingText = text.substring(match.index + 1);
      }

      match = regex.exec(remainingText);
    }

    if (this.refiners) {
      this.refiners.forEach(function () {
        results = refiner.refine(results, text, options);
      });
    }

    return results;
  };
};

exports.findYearClosestToRef = function (ref, day, month) {
  //Find the most appropriated year
  var refMoment = dayjs(ref);
  var dateMoment = refMoment;
  dateMoment = dateMoment.month(month - 1);
  dateMoment = dateMoment.date(day);
  dateMoment = dateMoment.year(refMoment.year());
  var nextYear = dateMoment.add(1, 'y');
  var lastYear = dateMoment.add(-1, 'y');

  if (Math.abs(nextYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
    dateMoment = nextYear;
  } else if (Math.abs(lastYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
    dateMoment = lastYear;
  }

  return dateMoment.year();
};

exports.ENISOFormatParser = __nested_webpack_require_8510__(14).Parser;
exports.ENDeadlineFormatParser = __nested_webpack_require_8510__(15).Parser;
exports.ENRelativeDateFormatParser = __nested_webpack_require_8510__(16).Parser;
exports.ENMonthNameLittleEndianParser = __nested_webpack_require_8510__(17).Parser;
exports.ENMonthNameMiddleEndianParser = __nested_webpack_require_8510__(18).Parser;
exports.ENMonthNameParser = __nested_webpack_require_8510__(19).Parser;
exports.ENSlashDateFormatParser = __nested_webpack_require_8510__(20).Parser;
exports.ENSlashDateFormatStartWithYearParser = __nested_webpack_require_8510__(21).Parser;
exports.ENSlashMonthFormatParser = __nested_webpack_require_8510__(22).Parser;
exports.ENTimeAgoFormatParser = __nested_webpack_require_8510__(23).Parser;
exports.ENTimeExpressionParser = __nested_webpack_require_8510__(24).Parser;
exports.ENTimeLaterFormatParser = __nested_webpack_require_8510__(25).Parser;
exports.ENWeekdayParser = __nested_webpack_require_8510__(6).Parser;
exports.ENCasualDateParser = __nested_webpack_require_8510__(26).Parser;
exports.ENCasualTimeParser = __nested_webpack_require_8510__(27).Parser;
exports.JPStandardParser = __nested_webpack_require_8510__(28).Parser;
exports.JPCasualDateParser = __nested_webpack_require_8510__(30).Parser;
exports.PTCasualDateParser = __nested_webpack_require_8510__(31).Parser;
exports.PTDeadlineFormatParser = __nested_webpack_require_8510__(32).Parser;
exports.PTMonthNameLittleEndianParser = __nested_webpack_require_8510__(33).Parser;
exports.PTSlashDateFormatParser = __nested_webpack_require_8510__(35).Parser;
exports.PTTimeAgoFormatParser = __nested_webpack_require_8510__(36).Parser;
exports.PTTimeExpressionParser = __nested_webpack_require_8510__(37).Parser;
exports.PTWeekdayParser = __nested_webpack_require_8510__(38).Parser;
exports.ESCasualDateParser = __nested_webpack_require_8510__(39).Parser;
exports.ESDeadlineFormatParser = __nested_webpack_require_8510__(40).Parser;
exports.ESTimeAgoFormatParser = __nested_webpack_require_8510__(41).Parser;
exports.ESTimeExpressionParser = __nested_webpack_require_8510__(42).Parser;
exports.ESWeekdayParser = __nested_webpack_require_8510__(43).Parser;
exports.ESMonthNameLittleEndianParser = __nested_webpack_require_8510__(44).Parser;
exports.ESSlashDateFormatParser = __nested_webpack_require_8510__(46).Parser;
exports.FRCasualDateParser = __nested_webpack_require_8510__(47).Parser;
exports.FRDeadlineFormatParser = __nested_webpack_require_8510__(48).Parser;
exports.FRMonthNameLittleEndianParser = __nested_webpack_require_8510__(49).Parser;
exports.FRSlashDateFormatParser = __nested_webpack_require_8510__(50).Parser;
exports.FRTimeAgoFormatParser = __nested_webpack_require_8510__(51).Parser;
exports.FRTimeExpressionParser = __nested_webpack_require_8510__(52).Parser;
exports.FRWeekdayParser = __nested_webpack_require_8510__(53).Parser;
exports.FRRelativeDateFormatParser = __nested_webpack_require_8510__(54).Parser;
exports.ZHHantDateParser = __nested_webpack_require_8510__(56).Parser;
exports.ZHHantWeekdayParser = __nested_webpack_require_8510__(57).Parser;
exports.ZHHantTimeExpressionParser = __nested_webpack_require_8510__(58).Parser;
exports.ZHHantCasualDateParser = __nested_webpack_require_8510__(59).Parser;
exports.ZHHantDeadlineFormatParser = __nested_webpack_require_8510__(60).Parser;
exports.DEDeadlineFormatParser = __nested_webpack_require_8510__(61).Parser;
exports.DEMonthNameLittleEndianParser = __nested_webpack_require_8510__(62).Parser;
exports.DEMonthNameParser = __nested_webpack_require_8510__(63).Parser;
exports.DESlashDateFormatParser = __nested_webpack_require_8510__(64).Parser;
exports.DETimeAgoFormatParser = __nested_webpack_require_8510__(65).Parser;
exports.DETimeExpressionParser = __nested_webpack_require_8510__(66).Parser;
exports.DEWeekdayParser = __nested_webpack_require_8510__(67).Parser;
exports.DECasualDateParser = __nested_webpack_require_8510__(68).Parser;
exports.NLMonthNameParser = __nested_webpack_require_8510__(69).Parser;
exports.NLMonthNameLittleEndianParser = __nested_webpack_require_8510__(70).Parser;
exports.NLSlashDateFormatParser = __nested_webpack_require_8510__(71).Parser;
exports.NLWeekdayParser = __nested_webpack_require_8510__(72).Parser;
exports.NLTimeExpressionParser = __nested_webpack_require_8510__(73).Parser;
exports.NLCasualDateParser = __nested_webpack_require_8510__(74).Parser;
exports.NLCasualTimeParser = __nested_webpack_require_8510__(75).Parser;

/***/ }),
/* 2 */
/***/ (function(module, exports, __nccwpck_require__) {

!function(t,e){  true?module.exports=e():0}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},d={s:c,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,u),i=e-r<0,s=t.clone().add(n+(i?-1:1),u);return Number(-(n+(e-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:a,w:s,d:i,D:"date",h:r,m:n,s:e,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,e,n){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),e&&(m[t]=e,r=t);else{var i=t.name;m[i]=t,r=i}return!n&&r&&(l=r),r||!n&&l},g=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new v(n)},D=d;D.l=M,D.i=y,D.w=function(t,e){return g(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r)return n?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(e)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,e){var n=g(t);return this.startOf(e)<=n&&n<=this.endOf(e)},d.isAfter=function(t,e){return g(t)<this.startOf(e)},d.isBefore=function(t,e){return this.endOf(e)<g(t)},d.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",n)},d.second=function(t){return this.$g(t,"$s",e)},d.millisecond=function(e){return this.$g(e,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,e){var n=D.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return f?n:n.endOf(i)},$=function(t,e){return D.w(h.toDate()[t].apply(h.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case n:return $(M+"Seconds",2);case e:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[n]=c+"Minutes",h[e]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(e){var n=g(f);return D.w(n.date(n.date()+Math.round(e*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[n]=6e4,h[r]=36e5,h[e]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:c(h,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return n.replace(f,function(t,e){return e||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[n]=m/6e4,c[e]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=M(t,e,!0);return r&&(n.$L=r),n},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,e){return t(e,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});


/***/ }),
/* 3 */
/***/ (function(module, exports, __nested_webpack_require_20862__) {

exports.Refiner = function Refiner() {
  this.refine = function (text, results, opt) {
    return results;
  };
};

exports.Filter = function Filter() {
  exports.Refiner.call(this);

  this.isValid = function (text, result, opt) {
    return true;
  };

  this.refine = function (text, results, opt) {
    var filteredResult = [];

    for (var i = 0; i < results.length; i++) {
      var result = results[i];

      if (this.isValid(text, result, opt)) {
        filteredResult.push(result);
      }
    }

    return filteredResult;
  };
}; // Common refiners


exports.OverlapRemovalRefiner = __nested_webpack_require_20862__(76).Refiner;
exports.ExtractTimezoneOffsetRefiner = __nested_webpack_require_20862__(77).Refiner;
exports.ExtractTimezoneAbbrRefiner = __nested_webpack_require_20862__(78).Refiner;
exports.ForwardDateRefiner = __nested_webpack_require_20862__(79).Refiner;
exports.UnlikelyFormatFilter = __nested_webpack_require_20862__(80).Refiner; // en refiners

exports.ENMergeDateTimeRefiner = __nested_webpack_require_20862__(5).Refiner;
exports.ENMergeDateRangeRefiner = __nested_webpack_require_20862__(9).Refiner;
exports.ENPrioritizeSpecificDateRefiner = __nested_webpack_require_20862__(81).Refiner; // ja refiners

exports.JPMergeDateRangeRefiner = __nested_webpack_require_20862__(82).Refiner; // fr refiners

exports.FRMergeDateRangeRefiner = __nested_webpack_require_20862__(83).Refiner;
exports.FRMergeDateTimeRefiner = __nested_webpack_require_20862__(84).Refiner; // de refiners

exports.DEMergeDateRangeRefiner = __nested_webpack_require_20862__(85).Refiner;
exports.DEMergeDateTimeRefiner = __nested_webpack_require_20862__(86).Refiner; // nl refiners

exports.NLMergeDateRangeRefiner = __nested_webpack_require_20862__(87).Refiner;
exports.NLMergeDateTimeRefiner = __nested_webpack_require_20862__(88).Refiner;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'sunday': 0,
  'sun': 0,
  'monday': 1,
  'mon': 1,
  'tuesday': 2,
  'tue': 2,
  'wednesday': 3,
  'wed': 3,
  'thursday': 4,
  'thur': 4,
  'thu': 4,
  'friday': 5,
  'fri': 5,
  'saturday': 6,
  'sat': 6
};
exports.MONTH_OFFSET = {
  'january': 1,
  'jan': 1,
  'jan.': 1,
  'february': 2,
  'feb': 2,
  'feb.': 2,
  'march': 3,
  'mar': 3,
  'mar.': 3,
  'april': 4,
  'apr': 4,
  'apr.': 4,
  'may': 5,
  'june': 6,
  'jun': 6,
  'jun.': 6,
  'july': 7,
  'jul': 7,
  'jul.': 7,
  'august': 8,
  'aug': 8,
  'aug.': 8,
  'september': 9,
  'sep': 9,
  'sep.': 9,
  'sept': 9,
  'sept.': 9,
  'october': 10,
  'oct': 10,
  'oct.': 10,
  'november': 11,
  'nov': 11,
  'nov.': 11,
  'december': 12,
  'dec': 12,
  'dec.': 12
};
exports.MONTH_PATTERN = '(?:' + Object.keys(exports.MONTH_OFFSET).join('|').replace(/\./g, '\\.') + ')';
exports.INTEGER_WORDS = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'ten': 10,
  'eleven': 11,
  'twelve': 12
};
exports.INTEGER_WORDS_PATTERN = '(?:' + Object.keys(exports.INTEGER_WORDS).join('|') + ')';
exports.ORDINAL_WORDS = {
  'first': 1,
  'second': 2,
  'third': 3,
  'fourth': 4,
  'fifth': 5,
  'sixth': 6,
  'seventh': 7,
  'eighth': 8,
  'ninth': 9,
  'tenth': 10,
  'eleventh': 11,
  'twelfth': 12,
  'thirteenth': 13,
  'fourteenth': 14,
  'fifteenth': 15,
  'sixteenth': 16,
  'seventeenth': 17,
  'eighteenth': 18,
  'nineteenth': 19,
  'twentieth': 20,
  'twenty first': 21,
  'twenty second': 22,
  'twenty third': 23,
  'twenty fourth': 24,
  'twenty fifth': 25,
  'twenty sixth': 26,
  'twenty seventh': 27,
  'twenty eighth': 28,
  'twenty ninth': 29,
  'thirtieth': 30,
  'thirty first': 31
};
exports.ORDINAL_WORDS_PATTERN = '(?:' + Object.keys(exports.ORDINAL_WORDS).join('|').replace(/ /g, '[ -]') + ')';
var TIME_UNIT = '(' + exports.INTEGER_WORDS_PATTERN + '|[0-9]+|[0-9]+\.[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' + '(sec(?:onds?)?|min(?:ute)?s?|h(?:r|rs|our|ours)?|weeks?|days?|months?|years?)\\s*';
var TIME_UNIT_STRICT = '(?:[0-9]+|an?)\\s*' + '(?:seconds?|minutes?|hours?|days?)\\s*';
var PATTERN_TIME_UNIT = new RegExp(TIME_UNIT, 'i');
exports.TIME_UNIT_PATTERN = '(?:' + TIME_UNIT + ')+';
exports.TIME_UNIT_STRICT_PATTERN = '(?:' + TIME_UNIT_STRICT + ')+';

exports.extractDateTimeUnitFragments = function (timeunitText) {
  var fragments = {};
  var remainingText = timeunitText;
  var match = PATTERN_TIME_UNIT.exec(remainingText);

  while (match) {
    collectDateTimeFragment(match, fragments);
    remainingText = remainingText.substring(match[0].length);
    match = PATTERN_TIME_UNIT.exec(remainingText);
  }

  return fragments;
};

function collectDateTimeFragment(match, fragments) {
  var num = match[1].toLowerCase();

  if (exports.INTEGER_WORDS[num] !== undefined) {
    num = exports.INTEGER_WORDS[num];
  } else if (num === 'a' || num === 'an') {
    num = 1;
  } else if (num.match(/few/)) {
    num = 3;
  } else if (num.match(/half/)) {
    num = 0.5;
  } else {
    num = parseFloat(num);
  }

  if (match[2].match(/^h/i)) {
    fragments['hour'] = num;
  } else if (match[2].match(/min/i)) {
    fragments['minute'] = num;
  } else if (match[2].match(/sec/i)) {
    fragments['second'] = num;
  } else if (match[2].match(/week/i)) {
    fragments['week'] = num;
  } else if (match[2].match(/day/i)) {
    fragments['d'] = num;
  } else if (match[2].match(/month/i)) {
    fragments['month'] = num;
  } else if (match[2].match(/year/i)) {
    fragments['year'] = num;
  }

  return fragments;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __nested_webpack_require_26239__) {

/*
    
*/
var ParsedComponents = __nested_webpack_require_26239__(0).ParsedComponents;

var Refiner = __nested_webpack_require_26239__(3).Refiner;

var PATTERN = new RegExp("^[ ]*(T|at|after|before|on|of|,|-)?[ ]*$");

var isDateOnly = exports.isDateOnly = function (result) {
  return !result.start.isCertain('hour');
};

var isTimeOnly = exports.isTimeOnly = function (result) {
  return !result.start.isCertain('month') && !result.start.isCertain('weekday');
};

var isAbleToMerge = exports.isAbleToMerge = function (text, prevResult, curResult) {
  var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
  return textBetween.match(PATTERN);
};

var mergeDateTimeComponent = exports.mergeDateTimeComponent = function (dateComponent, timeComponent) {
  var dateTimeComponent = dateComponent.clone();

  if (timeComponent.isCertain('hour')) {
    dateTimeComponent.assign('hour', timeComponent.get('hour'));
    dateTimeComponent.assign('minute', timeComponent.get('minute'));

    if (timeComponent.isCertain('second')) {
      dateTimeComponent.assign('second', timeComponent.get('second'));

      if (timeComponent.isCertain('millisecond')) {
        dateTimeComponent.assign('millisecond', timeComponent.get('millisecond'));
      } else {
        dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
      }
    } else {
      dateTimeComponent.imply('second', timeComponent.get('second'));
      dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
    }
  } else {
    dateTimeComponent.imply('hour', timeComponent.get('hour'));
    dateTimeComponent.imply('minute', timeComponent.get('minute'));
    dateTimeComponent.imply('second', timeComponent.get('second'));
    dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
  }

  if (timeComponent.isCertain('meridiem')) {
    dateTimeComponent.assign('meridiem', timeComponent.get('meridiem'));
  } else if (timeComponent.get('meridiem') !== undefined && dateTimeComponent.get('meridiem') === undefined) {
    dateTimeComponent.imply('meridiem', timeComponent.get('meridiem'));
  }

  if (dateTimeComponent.get('meridiem') == 1 && dateTimeComponent.get('hour') < 12) {
    if (timeComponent.isCertain('hour')) {
      dateTimeComponent.assign('hour', dateTimeComponent.get('hour') + 12);
    } else {
      dateTimeComponent.imply('hour', dateTimeComponent.get('hour') + 12);
    }
  }

  return dateTimeComponent;
};

function mergeResult(text, dateResult, timeResult) {
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

    if (dateResult.end == null && endDateTime.date().getTime() < beginDateTime.date().getTime()) {
      // Ex. 9pm - 1am
      if (endDateTime.isCertain('day')) {
        endDateTime.assign('day', endDateTime.get('day') + 1);
      } else {
        endDateTime.imply('day', endDateTime.get('day') + 1);
      }
    }

    dateResult.end = endDateTime;
  }

  dateResult.start = beginDateTime;
  var startIndex = Math.min(dateResult.index, timeResult.index);
  var endIndex = Math.max(dateResult.index + dateResult.text.length, timeResult.index + timeResult.text.length);
  dateResult.index = startIndex;
  dateResult.text = text.substring(startIndex, endIndex);

  for (var tag in timeResult.tags) {
    dateResult.tags[tag] = true;
  }

  dateResult.tags['ENMergeDateAndTimeRefiner'] = true;
  return dateResult;
}

exports.Refiner = function ENMergeDateTimeRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isDateOnly(prevResult) && isTimeOnly(currResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, prevResult, currResult);
        currResult = results[i + 1];
        i += 1;
      } else if (isDateOnly(currResult) && isTimeOnly(prevResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, currResult, prevResult);
        currResult = results[i + 1];
        i += 1;
      }

      mergedResult.push(prevResult);
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __nested_webpack_require_31045__) {

var dayjs = __nested_webpack_require_31045__(2);

var Parser = __nested_webpack_require_31045__(1).Parser;

var ParsedResult = __nested_webpack_require_31045__(0).ParsedResult;

var DAYS_OFFSET = {
  'sunday': 0,
  'sun': 0,
  'monday': 1,
  'mon': 1,
  'tuesday': 2,
  'tues': 2,
  'tue': 2,
  'wednesday': 3,
  'wed': 3,
  'thursday': 4,
  'thurs': 4,
  'thur': 4,
  'thu': 4,
  'friday': 5,
  'fri': 5,
  'saturday': 6,
  'sat': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:on\\s*?)?' + '(?:(this|last|past|next)\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(this|last|past|next)\\s*week)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.updateParsedComponent = function updateParsedComponent(result, ref, offset, modifier) {
  var startMoment = dayjs(ref);
  var startMomentFixed = false;
  var refOffset = startMoment.day();

  if (modifier == 'last' || modifier == 'past') {
    startMoment = startMoment.day(offset - 7);
    startMomentFixed = true;
  } else if (modifier == 'next') {
    startMoment = startMoment.day(offset + 7);
    startMomentFixed = true;
  } else if (modifier == 'this') {
    startMoment = startMoment.day(offset);
  } else {
    if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
      startMoment = startMoment.day(offset - 7);
    } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
      startMoment = startMoment.day(offset + 7);
    } else {
      startMoment = startMoment.day(offset);
    }
  }

  result.start.assign('weekday', offset);

  if (startMomentFixed) {
    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
  } else {
    result.start.imply('day', startMoment.date());
    result.start.imply('month', startMoment.month() + 1);
    result.start.imply('year', startMoment.year());
  }

  return result;
};

exports.Parser = function ENWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];

    if (offset === undefined) {
      return null;
    }

    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];
    var norm = prefix || postfix;
    norm = norm || '';
    norm = norm.toLowerCase();
    exports.updateParsedComponent(result, ref, offset, norm);
    result.tags['ENWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var NUMBER = {
  '零': 0,
  '一': 1,
  '二': 2,
  '兩': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6,
  '七': 7,
  '八': 8,
  '九': 9,
  '十': 10,
  '廿': 20,
  '卅': 30
};
var WEEKDAY_OFFSET = {
  '天': 0,
  '日': 0,
  '一': 1,
  '二': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6
};
exports.NUMBER = NUMBER;
exports.WEEKDAY_OFFSET = WEEKDAY_OFFSET;

exports.zhStringToNumber = function (text) {
  var number = 0;

  for (var i = 0; i < text.length; i++) {
    var _char = text[i];

    if (_char === '十') {
      number = number === 0 ? NUMBER[_char] : number * NUMBER[_char];
    } else {
      number += NUMBER[_char];
    }
  }

  return number;
};

exports.zhStringToYear = function (text) {
  var string = '';

  for (var i = 0; i < text.length; i++) {
    var _char2 = text[i];
    string = string + NUMBER[_char2];
  }

  return parseInt(string);
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'sonntag': 0,
  'so': 0,
  'montag': 1,
  'mo': 1,
  'dienstag': 2,
  'di': 2,
  'mittwoch': 3,
  'mi': 3,
  'donnerstag': 4,
  'do': 4,
  'freitag': 5,
  'fr': 5,
  'samstag': 6,
  'sa': 6
};
exports.MONTH_OFFSET = {
  'januar': 1,
  'jan': 1,
  'jan.': 1,
  'februar': 2,
  'feb': 2,
  'feb.': 2,
  'märz': 3,
  'maerz': 3,
  'mär': 3,
  'mär.': 3,
  'mrz': 3,
  'mrz.': 3,
  'april': 4,
  'apr': 4,
  'apr.': 4,
  'mai': 5,
  'juni': 6,
  'jun': 6,
  'jun.': 6,
  'juli': 7,
  'jul': 7,
  'jul.': 7,
  'august': 8,
  'aug': 8,
  'aug.': 8,
  'september': 9,
  'sep': 9,
  'sep.': 9,
  'sept': 9,
  'sept.': 9,
  'oktober': 10,
  'okt': 10,
  'okt.': 10,
  'november': 11,
  'nov': 11,
  'nov.': 11,
  'dezember': 12,
  'dez': 12,
  'dez.': 12
};
exports.INTEGER_WORDS_PATTERN = '(?:eins|zwei|drei|vier|fünf|fuenf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwoelf)';
exports.INTEGER_WORDS = {
  'eins': 1,
  'zwei': 2,
  'drei': 3,
  'vier': 4,
  'fünf': 5,
  'fuenf': 5,
  'sechs': 6,
  'sieben': 7,
  'acht': 8,
  'neun': 9,
  'zehn': 10,
  'elf': 11,
  'zwölf': 12,
  'zwoelf': 12
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __nested_webpack_require_36058__) {

/*
  
*/
var Refiner = __nested_webpack_require_36058__(3).Refiner;

exports.Refiner = function ENMergeDateRangeRefiner() {
  Refiner.call(this);

  this.pattern = function () {
    return /^\s*(to|\-)\s*$/i;
  };

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (!prevResult.end && !currResult.end && this.isAbleToMerge(text, prevResult, currResult)) {
        prevResult = this.mergeResult(text, prevResult, currResult);
        currResult = null;
        i += 1;
      }

      mergedResult.push(prevResult);
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };

  this.isAbleToMerge = function (text, result1, result2) {
    var begin = result1.index + result1.text.length;
    var end = result2.index;
    var textBetween = text.substring(begin, end);
    return textBetween.match(this.pattern());
  };

  this.mergeResult = function (text, fromResult, toResult) {
    if (!fromResult.isOnlyWeekday() && !toResult.isOnlyWeekday()) {
      var timeKeys = {
        'hour': true,
        'minute': true,
        'second': true
      };

      for (var key in toResult.start.knownValues) {
        if (!fromResult.start.isCertain(key)) {
          fromResult.start.assign(key, toResult.start.get(key));
        }
      }

      for (var key in fromResult.start.knownValues) {
        if (!toResult.start.isCertain(key)) {
          toResult.start.assign(key, fromResult.start.get(key));
        }
      }
    }

    if (fromResult.start.date().getTime() > toResult.start.date().getTime()) {
      var fromMoment = fromResult.start.dayjs();
      var toMoment = toResult.start.dayjs();

      if (fromResult.isOnlyWeekday() && fromMoment.add(-7, 'days').isBefore(toMoment)) {
        fromMoment = fromMoment.add(-7, 'days');
        fromResult.start.imply('day', fromMoment.date());
        fromResult.start.imply('month', fromMoment.month() + 1);
        fromResult.start.imply('year', fromMoment.year());
      } else if (toResult.isOnlyWeekday() && toMoment.add(7, 'days').isAfter(fromMoment)) {
        toMoment = toMoment.add(7, 'days');
        toResult.start.imply('day', toMoment.date());
        toResult.start.imply('month', toMoment.month() + 1);
        toResult.start.imply('year', toMoment.year());
      } else {
        var tmp = toResult;
        toResult = fromResult;
        fromResult = tmp;
      }
    }

    fromResult.end = toResult.start;

    for (var tag in toResult.tags) {
      fromResult.tags[tag] = true;
    }

    var startIndex = Math.min(fromResult.index, toResult.index);
    var endIndex = Math.max(fromResult.index + fromResult.text.length, toResult.index + toResult.text.length);
    fromResult.index = startIndex;
    fromResult.text = text.substring(startIndex, endIndex);
    fromResult.tags[this.constructor.name] = true;
    return fromResult;
  };
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'dimanche': 0,
  'dim': 0,
  'lundi': 1,
  'lun': 1,
  'mardi': 2,
  'mar': 2,
  'mercredi': 3,
  'mer': 3,
  'jeudi': 4,
  'jeu': 4,
  'vendredi': 5,
  'ven': 5,
  'samedi': 6,
  'sam': 6
};
exports.MONTH_OFFSET = {
  'janvier': 1,
  'jan': 1,
  'jan.': 1,
  'février': 2,
  'fév': 2,
  'fév.': 2,
  'fevrier': 2,
  'fev': 2,
  'fev.': 2,
  'mars': 3,
  'mar': 3,
  'mar.': 3,
  'avril': 4,
  'avr': 4,
  'avr.': 4,
  'mai': 5,
  'juin': 6,
  'jun': 6,
  'juillet': 7,
  'jul': 7,
  'jul.': 7,
  'août': 8,
  'aout': 8,
  'septembre': 9,
  'sep': 9,
  'sep.': 9,
  'sept': 9,
  'sept.': 9,
  'octobre': 10,
  'oct': 10,
  'oct.': 10,
  'novembre': 11,
  'nov': 11,
  'nov.': 11,
  'décembre': 12,
  'decembre': 12,
  'dec': 12,
  'dec.': 12
};
exports.INTEGER_WORDS_PATTERN = '(?:un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize)';
exports.INTEGER_WORDS = {
  'un': 1,
  'deux': 2,
  'trois': 3,
  'quatre': 4,
  'cinq': 5,
  'six': 6,
  'sept': 7,
  'huit': 8,
  'neuf': 9,
  'dix': 10,
  'onze': 11,
  'douze': 12,
  'treize': 13
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'zondag': 0,
  'zo': 0,
  'zo.': 0,
  'maandag': 1,
  'ma': 1,
  'ma.': 1,
  'dinsdag': 2,
  'di': 2,
  'di.': 2,
  'woensdag': 3,
  'wo': 3,
  'wo.': 3,
  'donderdag': 4,
  'do': 4,
  'do.': 4,
  'vrijdag': 5,
  'vr': 5,
  'vr.': 5,
  'zaterdag': 6,
  'za': 6,
  'za.': 6
};
exports.WEEKDAY_PATTERN = '(?:' + Object.keys(exports.WEEKDAY_OFFSET).join('|').replace(/\./g, '\\.') + ')';
exports.MONTH_OFFSET = {
  'januari': 1,
  'jan': 1,
  'jan.': 1,
  'februari': 2,
  'feb': 2,
  'feb.': 2,
  'maart': 3,
  'mrt': 3,
  'mrt.': 3,
  'april': 4,
  'apr': 4,
  'apr.': 4,
  'mei': 5,
  'juni': 6,
  'jun': 6,
  'jun.': 6,
  'juli': 7,
  'jul': 7,
  'jul.': 7,
  'augustus': 8,
  'aug': 8,
  'aug.': 8,
  'september': 9,
  'sep': 9,
  'sep.': 9,
  'sept': 9,
  'sept.': 9,
  'oktober': 10,
  'okt': 10,
  'okt.': 10,
  'november': 11,
  'nov': 11,
  'nov.': 11,
  'december': 12,
  'dec': 12,
  'dec.': 12
};
exports.MONTH_PATTERN = '(?:' + Object.keys(exports.MONTH_OFFSET).join('|').replace(/\./g, '\\.') + ')';
exports.INTEGER_WORDS = {
  'een': 1,
  'één': 1,
  'twee': 2,
  'drie': 3,
  'vier': 4,
  'vijf': 5,
  'zes': 6,
  'zeven': 7,
  'acht': 8,
  'negen': 9,
  'tien': 10,
  'elf': 11,
  'twaalf': 12
};
exports.INTEGER_WORDS_PATTERN = '(?:' + Object.keys(exports.INTEGER_WORDS).join('|') + ')';
exports.ORDINAL_WORDS = {
  'eerste': 1,
  'tweede': 2,
  'derde': 3,
  'vierde': 4,
  'vijfde': 5,
  'zesde': 6,
  'zevende': 7,
  'achste': 8,
  'negende': 9,
  'tiende': 10,
  'elfde': 11,
  'twaalfde': 12,
  'dertiende': 13,
  'veertiende': 14,
  'vijftiende': 15,
  'zestiende': 16,
  'zeventiende': 17,
  'achttiende': 18,
  'negentiende': 19,
  'twintigste': 20,
  'eenentwintigste': 21,
  'tweeëntwintigste': 22,
  'drieëntwintigste': 23,
  'vierentwintigste': 24,
  'vijfentwintigste': 25,
  'zesentwintigste': 26,
  'zevenentwintigste': 27,
  'achtentwintigste': 28,
  'negenentwintigste': 29,
  'dertigste': 30,
  'eenendertigste': 31
};
exports.ORDINAL_WORDS_PATTERN = '(?:' + Object.keys(exports.ORDINAL_WORDS).join('|').replace(/ /g, '[ -]') + ')';
var TIME_UNIT = '(' + exports.INTEGER_WORDS_PATTERN + '|[0-9]+|[0-9]+\.[0-9]+|en(?:\\s*few)?|half)\\s*' + '(sec(?:onde?)?|min(?:uten)?s?|(?:uur|uren)?|weken?|dagen?|maanden?|jaren?)\\s*';
var TIME_UNIT_STRICT = '(?:[0-9]+?)\\s*' + '(?:seconden?|(?:minuut|minuten)|(?:uur|uren)|(?:dag|dagen))\\s*';
var PATTERN_TIME_UNIT = new RegExp(TIME_UNIT, 'i');
exports.TIME_UNIT_PATTERN = '(?:' + TIME_UNIT + ')+';
exports.TIME_UNIT_STRICT_PATTERN = '(?:' + TIME_UNIT_STRICT + ')+';

exports.extractDateTimeUnitFragments = function (timeunitText) {
  var fragments = {};
  var remainingText = timeunitText;
  var match = PATTERN_TIME_UNIT.exec(remainingText);

  while (match) {
    collectDateTimeFragment(match, fragments);
    remainingText = remainingText.substring(match[0].length);
    match = PATTERN_TIME_UNIT.exec(remainingText);
  }

  return fragments;
};

function collectDateTimeFragment(match, fragments) {
  var num = match[1].toLowerCase();

  if (exports.INTEGER_WORDS[num] !== undefined) {
    num = exports.INTEGER_WORDS[num];
  } else if (num.match(/half/)) {
    num = 0.5;
  } else {
    num = parseFloat(num);
  }

  if (match[2].match(/^(?:uur|uren)/i)) {
    fragments['hour'] = num;
  } else if (match[2].match(/min/i)) {
    fragments['minute'] = num;
  } else if (match[2].match(/sec/i)) {
    fragments['second'] = num;
  } else if (match[2].match(/week/i)) {
    fragments['week'] = num;
  } else if (match[2].match(/dag/i)) {
    fragments['d'] = num;
  } else if (match[2].match(/maand/i)) {
    fragments['month'] = num;
  } else if (match[2].match(/jaar/i)) {
    fragments['year'] = num;
  }

  return fragments;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __nested_webpack_require_44158__) {

var options = exports.options = __nested_webpack_require_44158__(13);

exports.parser = __nested_webpack_require_44158__(1);
exports.refiner = __nested_webpack_require_44158__(3);
exports.Parser = exports.parser.Parser;
exports.Refiner = exports.refiner.Refiner;
exports.Filter = exports.refiner.Filter;
exports.ParsedResult = __nested_webpack_require_44158__(0).ParsedResult;
exports.ParsedComponents = __nested_webpack_require_44158__(0).ParsedComponents;

var Chrono = function Chrono(option) {
  option = option || exports.options.casualOption();
  this.parsers = new Object(option.parsers);
  this.refiners = new Object(option.refiners);
};

Chrono.prototype.parse = function (text, refDate, opt) {
  refDate = refDate || new Date();
  opt = opt || {};
  opt.forwardDate = opt.forwardDate || opt.forwardDate;
  var allResults = [];
  this.parsers.forEach(function (parser) {
    var results = parser.execute(text, refDate, opt);
    allResults = allResults.concat(results);
  });
  allResults.sort(function (a, b) {
    return a.index - b.index;
  });
  this.refiners.forEach(function (refiner) {
    allResults = refiner.refine(text, allResults, opt);
  });
  return allResults;
};

Chrono.prototype.parseDate = function (text, refDate, opt) {
  var results = this.parse(text, refDate, opt);

  if (results.length > 0) {
    return results[0].start.date();
  }

  return null;
};

exports.Chrono = Chrono;
exports.strict = new Chrono(options.strictOption());
exports.casual = new Chrono(options.casualOption());
exports.en = new Chrono(options.mergeOptions([options.en.casual, options.commonPostProcessing]));
exports.en_GB = new Chrono(options.mergeOptions([options.en_GB.casual, options.commonPostProcessing]));
exports.de = new Chrono(options.mergeOptions([options.de.casual, options.en, options.commonPostProcessing]));
exports.nl = new Chrono(options.mergeOptions([options.nl.casual, options.en, options.commonPostProcessing]));
exports.pt = new Chrono(options.mergeOptions([options.pt.casual, options.en, options.commonPostProcessing]));
exports.es = new Chrono(options.mergeOptions([options.es.casual, options.en, options.commonPostProcessing]));
exports.fr = new Chrono(options.mergeOptions([options.fr.casual, options.en, options.commonPostProcessing]));
exports.ja = new Chrono(options.mergeOptions([options.ja.casual, options.en, options.commonPostProcessing]));

exports.parse = function () {
  return exports.casual.parse.apply(exports.casual, arguments);
};

exports.parseDate = function () {
  return exports.casual.parseDate.apply(exports.casual, arguments);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __nested_webpack_require_46754__) {

var parser = __nested_webpack_require_46754__(1);

var refiner = __nested_webpack_require_46754__(3);

exports.mergeOptions = function (options) {
  var addedTypes = {};
  var mergedOption = {
    parsers: [],
    refiners: []
  };
  options.forEach(function (option) {
    if (option.call) {
      option = option.call();
    }

    if (option.parsers) {
      option.parsers.forEach(function (p) {
        if (!addedTypes[p.constructor]) {
          mergedOption.parsers.push(p);
          addedTypes[p.constructor] = true;
        }
      });
    }

    if (option.refiners) {
      option.refiners.forEach(function (r) {
        if (!addedTypes[r.constructor]) {
          mergedOption.refiners.push(r);
          addedTypes[r.constructor] = true;
        }
      });
    }
  });
  return mergedOption;
};

exports.commonPostProcessing = function () {
  return {
    refiners: [// These should be after all other refiners
    new refiner.ExtractTimezoneOffsetRefiner(), new refiner.ExtractTimezoneAbbrRefiner(), new refiner.UnlikelyFormatFilter()]
  };
}; // -------------------------------------------------------------


exports.strictOption = function () {
  var strictConfig = {
    strict: true
  };
  return exports.mergeOptions([exports.en(strictConfig), exports.de(strictConfig), exports.nl(strictConfig), exports.pt(strictConfig), exports.es(strictConfig), exports.fr(strictConfig), exports.ja(strictConfig), exports.zh, exports.commonPostProcessing]);
};

exports.casualOption = function () {
  return exports.mergeOptions([exports.en.casual, // Some German abbriviate overlap with common English
  exports.de({
    strict: true
  }), exports.nl, exports.pt, exports.es, exports.fr, exports.ja, exports.zh, exports.commonPostProcessing]);
}; // -------------------------------------------------------------


exports.de = function (config) {
  return {
    parsers: [new parser.DEDeadlineFormatParser(config), new parser.DEMonthNameLittleEndianParser(config), new parser.DEMonthNameParser(config), new parser.DESlashDateFormatParser(config), new parser.DETimeAgoFormatParser(config), new parser.DETimeExpressionParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), new refiner.DEMergeDateTimeRefiner(), new refiner.DEMergeDateRangeRefiner()]
  };
};

exports.de.casual = function () {
  var option = exports.de({
    strict: false
  });
  option.parsers.unshift(new parser.DECasualDateParser());
  option.parsers.unshift(new parser.DEWeekdayParser());
  return option;
}; // -------------------------------------------------------------


exports.nl = function (config) {
  return {
    parsers: [new parser.NLMonthNameLittleEndianParser(config), new parser.NLMonthNameParser(config), new parser.NLSlashDateFormatParser(config), new parser.NLTimeExpressionParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), new refiner.NLMergeDateTimeRefiner(), new refiner.NLMergeDateRangeRefiner()]
  };
};

exports.nl.casual = function () {
  var option = exports.nl({
    strict: false
  });
  option.parsers.unshift(new parser.NLCasualDateParser());
  option.parsers.unshift(new parser.NLCasualTimeParser());
  option.parsers.unshift(new parser.NLWeekdayParser());
  return option;
}; // -------------------------------------------------------------


exports.en = function (config) {
  return {
    parsers: [new parser.ENISOFormatParser(config), new parser.ENDeadlineFormatParser(config), new parser.ENMonthNameLittleEndianParser(config), new parser.ENMonthNameMiddleEndianParser(config), new parser.ENMonthNameParser(config), new parser.ENSlashDateFormatParser(config), new parser.ENSlashDateFormatStartWithYearParser(config), new parser.ENSlashMonthFormatParser(config), new parser.ENTimeAgoFormatParser(config), new parser.ENTimeLaterFormatParser(config), new parser.ENTimeExpressionParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), // English
    new refiner.ENMergeDateTimeRefiner(), new refiner.ENMergeDateRangeRefiner(), new refiner.ENPrioritizeSpecificDateRefiner()]
  };
};

exports.en.casual = function (config) {
  config = config || {};
  config.strict = false;
  var option = exports.en(config); // en

  option.parsers.unshift(new parser.ENCasualDateParser());
  option.parsers.unshift(new parser.ENCasualTimeParser());
  option.parsers.unshift(new parser.ENWeekdayParser());
  option.parsers.unshift(new parser.ENRelativeDateFormatParser());
  return option;
};

exports.en_GB = function (config) {
  config = config || {};
  config.littleEndian = true;
  return exports.en(config);
};

exports.en_GB.casual = function (config) {
  config = config || {};
  config.littleEndian = true;
  return exports.en.casual(config);
}; // -------------------------------------------------------------


exports.ja = function () {
  return {
    parsers: [new parser.JPStandardParser()],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), new refiner.JPMergeDateRangeRefiner()]
  };
};

exports.ja.casual = function () {
  var option = exports.ja();
  option.parsers.unshift(new parser.JPCasualDateParser());
  return option;
}; // -------------------------------------------------------------


exports.pt = function (config) {
  return {
    parsers: [new parser.PTTimeAgoFormatParser(config), new parser.PTDeadlineFormatParser(config), new parser.PTTimeExpressionParser(config), new parser.PTMonthNameLittleEndianParser(config), new parser.PTSlashDateFormatParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner()]
  };
};

exports.pt.casual = function () {
  var option = exports.pt({
    strict: false
  });
  option.parsers.unshift(new parser.PTCasualDateParser());
  option.parsers.unshift(new parser.PTWeekdayParser());
  return option;
}; // -------------------------------------------------------------


exports.es = function (config) {
  return {
    parsers: [new parser.ESTimeAgoFormatParser(config), new parser.ESDeadlineFormatParser(config), new parser.ESTimeExpressionParser(config), new parser.ESMonthNameLittleEndianParser(config), new parser.ESSlashDateFormatParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner()]
  };
};

exports.es.casual = function () {
  var option = exports.es({
    strict: false
  });
  option.parsers.unshift(new parser.ESCasualDateParser());
  option.parsers.unshift(new parser.ESWeekdayParser());
  return option;
}; // -------------------------------------------------------------


exports.fr = function (config) {
  return {
    parsers: [new parser.FRDeadlineFormatParser(config), new parser.FRMonthNameLittleEndianParser(config), new parser.FRSlashDateFormatParser(config), new parser.FRTimeAgoFormatParser(config), new parser.FRTimeExpressionParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), new refiner.FRMergeDateRangeRefiner(), new refiner.FRMergeDateTimeRefiner()]
  };
};

exports.fr.casual = function () {
  var option = exports.fr({
    strict: false
  });
  option.parsers.unshift(new parser.FRCasualDateParser());
  option.parsers.unshift(new parser.FRWeekdayParser());
  option.parsers.unshift(new parser.FRRelativeDateFormatParser());
  return option;
}; // -------------------------------------------------------------


exports.zh = function () {
  return {
    parsers: [new parser.ZHHantDateParser(), new parser.ZHHantWeekdayParser(), new parser.ZHHantTimeExpressionParser(), new parser.ZHHantCasualDateParser(), new parser.ZHHantDeadlineFormatParser()],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner()]
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __nested_webpack_require_54563__) {

/*
    ISO 8601
    http://www.w3.org/TR/NOTE-datetime
    - YYYY-MM-DD
    - YYYY-MM-DDThh:mmTZD
    - YYYY-MM-DDThh:mm:ssTZD
    - YYYY-MM-DDThh:mm:ss.sTZD 
    - TZD = (Z or +hh:mm or -hh:mm)
*/
var dayjs = __nested_webpack_require_54563__(2);

var Parser = __nested_webpack_require_54563__(1).Parser;

var ParsedResult = __nested_webpack_require_54563__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})' + '(?:T' //..
+ '([0-9]{1,2}):([0-9]{1,2})' // hh:mm
+ '(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?' // :ss.s
+ '(?:Z|([+-]\\d{2}):?(\\d{2})?)?' // TZD (Z or ±hh:mm or ±hhmm or ±hh)
+ ')?' //..
+ '(?=\\W|$)', 'i');
var YEAR_NUMBER_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP = 4;
var HOUR_NUMBER_GROUP = 5;
var MINUTE_NUMBER_GROUP = 6;
var SECOND_NUMBER_GROUP = 7;
var MILLISECOND_NUMBER_GROUP = 8;
var TZD_HOUR_OFFSET_GROUP = 9;
var TZD_MINUTE_OFFSET_GROUP = 10;

exports.Parser = function ENISOFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    result.start.assign('year', parseInt(match[YEAR_NUMBER_GROUP]));
    result.start.assign('month', parseInt(match[MONTH_NUMBER_GROUP]));
    result.start.assign('day', parseInt(match[DATE_NUMBER_GROUP]));

    if (dayjs(result.start.get('month')) > 12 || dayjs(result.start.get('month')) < 1 || dayjs(result.start.get('day')) > 31 || dayjs(result.start.get('day')) < 1) {
      return null;
    }

    if (match[HOUR_NUMBER_GROUP] != null) {
      result.start.assign('hour', parseInt(match[HOUR_NUMBER_GROUP]));
      result.start.assign('minute', parseInt(match[MINUTE_NUMBER_GROUP]));

      if (match[SECOND_NUMBER_GROUP] != null) {
        result.start.assign('second', parseInt(match[SECOND_NUMBER_GROUP]));
      }

      if (match[MILLISECOND_NUMBER_GROUP] != null) {
        result.start.assign('millisecond', parseInt(match[MILLISECOND_NUMBER_GROUP]));
      }

      if (match[TZD_HOUR_OFFSET_GROUP] == null) {
        result.start.assign('timezoneOffset', 0);
      } else {
        var minuteOffset = 0;
        var hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
        if (match[TZD_MINUTE_OFFSET_GROUP] != null) minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);
        var offset = hourOffset * 60;

        if (offset < 0) {
          offset -= minuteOffset;
        } else {
          offset += minuteOffset;
        }

        result.start.assign('timezoneOffset', offset);
      }
    }

    result.tags['ENISOFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __nested_webpack_require_57413__) {

var dayjs = __nested_webpack_require_57413__(2);

var Parser = __nested_webpack_require_57413__(1).Parser;

var ParsedResult = __nested_webpack_require_57413__(0).ParsedResult;

var util = __nested_webpack_require_57413__(4);

var PATTERN = new RegExp('(\\W|^)' + '(within|in)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' + '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)\\s*' + '(?=\\W|$)', 'i');
var STRICT_PATTERN = new RegExp('(\\W|^)' + '(within|in)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?)\\s*' + '(seconds?|minutes?|hours?|days?)\\s*' + '(?=\\W|$)', 'i');

exports.Parser = function ENDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = match[3].toLowerCase();

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === 'a' || num === 'an') {
      num = 1;
    } else if (num.match(/few/i)) {
      num = 3;
    } else if (num.match(/half/i)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    var date = dayjs(ref);

    if (match[4].match(/day|week|month|year/i)) {
      if (match[4].match(/day/i)) {
        date = date.add(num, 'd');
      } else if (match[4].match(/week/i)) {
        date = date.add(num * 7, 'd');
      } else if (match[4].match(/month/i)) {
        date = date.add(num, 'month');
      } else if (match[4].match(/year/i)) {
        date = date.add(num, 'year');
      }

      result.start.imply('year', date.year());
      result.start.imply('month', date.month() + 1);
      result.start.imply('day', date.date());
      return result;
    }

    if (match[4].match(/hour/i)) {
      date = date.add(num, 'hour');
    } else if (match[4].match(/min/i)) {
      date = date.add(num, 'minute');
    } else if (match[4].match(/second/i)) {
      date = date.add(num, 'second');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.imply('hour', date.hour());
    result.start.imply('minute', date.minute());
    result.start.imply('second', date.second());
    result.tags['ENDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __nested_webpack_require_60077__) {

var dayjs = __nested_webpack_require_60077__(2);

var Parser = __nested_webpack_require_60077__(1).Parser;

var ParsedResult = __nested_webpack_require_60077__(0).ParsedResult;

var util = __nested_webpack_require_60077__(4);

var PATTERN = new RegExp('(\\W|^)' + '(this|next|last|past)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|few|half(?:\\s*an?)?)?\\s*' + '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)(?=\\s*)' + '(?=\\W|$)', 'i');
var MODIFIER_WORD_GROUP = 2;
var MULTIPLIER_WORD_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;

exports.Parser = function ENRelativeDateFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var modifier = match[MODIFIER_WORD_GROUP].toLowerCase().match(/^next/) ? 1 : -1;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    result.tags['ENRelativeDateFormatParser'] = true;
    var num = match[MULTIPLIER_WORD_GROUP] === undefined ? '' : match[3].toLowerCase();

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === '') {
      num = 1;
    } else if (num.match(/few/i)) {
      num = 3;
    } else if (num.match(/half/i)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    num *= modifier;
    var date = dayjs(ref);

    if (match[MODIFIER_WORD_GROUP].toLowerCase().match(/^this/)) {
      if (match[MULTIPLIER_WORD_GROUP]) {
        return null;
      }

      if (match[RELATIVE_WORD_GROUP].match(/day|week|month|year/i)) {
        // This week
        if (match[RELATIVE_WORD_GROUP].match(/week/i)) {
          date = date.add(-date.get('d'), 'd');
          result.start.imply('day', date.date());
          result.start.imply('month', date.month() + 1);
          result.start.imply('year', date.year());
        } // This month
        else if (match[RELATIVE_WORD_GROUP].match(/month/i)) {
            date = date.add(-date.date() + 1, 'd');
            result.start.imply('day', date.date());
            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
          } // This year
          else if (match[RELATIVE_WORD_GROUP].match(/year/i)) {
              date = date.add(-date.date() + 1, 'd');
              date = date.add(-date.month(), 'month');
              result.start.imply('day', date.date());
              result.start.imply('month', date.month() + 1);
              result.start.assign('year', date.year());
            }

        return result;
      }
    }

    if (match[RELATIVE_WORD_GROUP].match(/day|week|month|year/i)) {
      if (match[RELATIVE_WORD_GROUP].match(/day/i)) {
        date = date.add(num, 'd');
        result.start.assign('year', date.year());
        result.start.assign('month', date.month() + 1);
        result.start.assign('day', date.date());
      } else if (match[RELATIVE_WORD_GROUP].match(/week/i)) {
        date = date.add(num * 7, 'd'); // We don't know the exact date for next/last week so we imply
        // them

        result.start.imply('day', date.date());
        result.start.imply('month', date.month() + 1);
        result.start.imply('year', date.year());
      } else if (match[RELATIVE_WORD_GROUP].match(/month/i)) {
        date = date.add(num, 'month'); // We don't know the exact day for next/last month

        result.start.imply('day', date.date());
        result.start.assign('year', date.year());
        result.start.assign('month', date.month() + 1);
      } else if (match[RELATIVE_WORD_GROUP].match(/year/i)) {
        date = date.add(num, 'year'); // We don't know the exact day for month on next/last year

        result.start.imply('day', date.date());
        result.start.imply('month', date.month() + 1);
        result.start.assign('year', date.year());
      }

      return result;
    }

    if (match[RELATIVE_WORD_GROUP].match(/hour/i)) {
      date = date.add(num, 'hour');
      result.start.imply('minute', date.minute());
      result.start.imply('second', date.second());
    } else if (match[RELATIVE_WORD_GROUP].match(/min/i)) {
      date = date.add(num, 'minute');
      result.start.assign('minute', date.minute());
      result.start.imply('second', date.second());
    } else if (match[RELATIVE_WORD_GROUP].match(/second/i)) {
      date = date.add(num, 'second');
      result.start.assign('second', date.second());
      result.start.assign('minute', date.minute());
    }

    result.start.assign('hour', date.hour());
    result.start.assign('year', date.year());
    result.start.assign('month', date.month() + 1);
    result.start.assign('day', date.date());
    return result;
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __nested_webpack_require_65000__) {

var parser = __nested_webpack_require_65000__(1);

var ParsedResult = __nested_webpack_require_65000__(0).ParsedResult;

var util = __nested_webpack_require_65000__(4);

var PATTERN = new RegExp('(\\W|^)' + '(?:on\\s*?)?' + '(?:(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\\s*,?\\s*)?' + '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')' + '(?:\\s*' + '(?:to|\\-|\\–|until|through|till|\\s)\\s*' + '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')' + ')?' + '(?:-|\/|\\s*(?:of)?\\s*)' + '(' + util.MONTH_PATTERN + ')' + '(?:' + '(?:-|\/|,?\\s*)' + '((?:' + '[1-9][0-9]{0,3}\\s*(?:BE|AD|BC)|' + '[1-2][0-9]{3}|' + '[5-9][0-9]' + ')(?![^\\s]\\d))' + ')?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_NUM_GROUP = 4;
var DATE_TO_GROUP = 5;
var DATE_TO_NUM_GROUP = 6;
var MONTH_NAME_GROUP = 7;
var YEAR_GROUP = 8;

exports.Parser = function ENMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_NUM_GROUP] ? parseInt(match[DATE_NUM_GROUP]) : util.ORDINAL_WORDS[match[DATE_GROUP].trim().replace('-', ' ').toLowerCase()];
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];

      if (/BE/i.test(year)) {
        // Buddhist Era
        year = year.replace(/BE/i, '');
        year = parseInt(year) - 543;
      } else if (/BC/i.test(year)) {
        // Before Christ
        year = year.replace(/BC/i, '');
        year = -parseInt(year);
      } else if (/AD/i.test(year)) {
        year = year.replace(/AD/i, '');
        year = parseInt(year);
      } else {
        year = parseInt(year);

        if (year < 100) {
          if (year > 50) {
            year = year + 1900;
          } else {
            year = year + 2000;
          }
        }
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 January 2012'


    if (match[DATE_TO_GROUP]) {
      var endDate = match[DATE_TO_NUM_GROUP] ? parseInt(match[DATE_TO_NUM_GROUP]) : util.ORDINAL_WORDS[match[DATE_TO_GROUP].trim().replace('-', ' ').toLowerCase()];
      result.end = result.start.clone();
      result.end.assign('day', endDate);
    }

    result.tags['ENMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __nested_webpack_require_68249__) {

/*

    The parser for parsing US's date format that begin with month's name.

    EX.
        - January 13
        - January 13, 2012
        - January 13 - 15, 2012
        - Tuesday, January 13, 2012

    Watch out for:
        - January 12:00
        - January 12.44
        - January 1222344
*/
var parser = __nested_webpack_require_68249__(1);

var ParsedResult = __nested_webpack_require_68249__(0).ParsedResult;

var util = __nested_webpack_require_68249__(4);

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:on\\s*?)?' + '(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun\\.?|Mon\\.?|Tue\\.?|Wed\\.?|Thu\\.?|Fri\\.?|Sat\\.?)' + '\\s*,?\\s*)?' + '(' + util.MONTH_PATTERN + ')' + '(?:-|\/|\\s*,?\\s*)' + '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')(?!\\s*(?:am|pm))\\s*' + '' + '(?:' + '(?:to|\\-)\\s*' + '(([0-9]{1,2})(?:st|nd|rd|th)?| ' + util.ORDINAL_WORDS_PATTERN + ')\\s*' + ')?' + '(?:' + '(?:-|\/|\\s*,?\\s*)' + '(?:([0-9]{4})\\s*(BE|AD|BC)?|([0-9]{1,4})\\s*(AD|BC))\\s*' + ')?' + '(?=\\W|$)(?!\\:\\d)', 'i');
var WEEKDAY_GROUP = 2;
var MONTH_NAME_GROUP = 3;
var DATE_GROUP = 4;
var DATE_NUM_GROUP = 5;
var DATE_TO_GROUP = 6;
var DATE_TO_NUM_GROUP = 7;
var YEAR_GROUP = 8;
var YEAR_BE_GROUP = 9;
var YEAR_GROUP2 = 10;
var YEAR_BE_GROUP2 = 11;

exports.Parser = function ENMonthNameMiddleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_NUM_GROUP] ? parseInt(match[DATE_NUM_GROUP]) : util.ORDINAL_WORDS[match[DATE_GROUP].trim().replace('-', ' ').toLowerCase()];
    var year = null;

    if (match[YEAR_GROUP] || match[YEAR_GROUP2]) {
      year = match[YEAR_GROUP] || match[YEAR_GROUP2];
      year = parseInt(year);
      var yearBE = match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2];

      if (yearBE) {
        if (/BE/i.test(yearBE)) {
          // Buddhist Era
          year = year - 543;
        } else if (/BC/i.test(yearBE)) {
          // Before Christ
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as 'January 12 - 13, 2012'


    if (match[DATE_TO_GROUP]) {
      var endDate = match[DATE_TO_NUM_GROUP] ? endDate = parseInt(match[DATE_TO_NUM_GROUP]) : util.ORDINAL_WORDS[match[DATE_TO_GROUP].replace('-', ' ').trim().toLowerCase()];
      result.end = result.start.clone();
      result.end.assign('day', endDate);
    }

    result.tags['ENMonthNameMiddleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __nested_webpack_require_71719__) {

/*
    
    The parser for parsing month name and year.
    
    EX. 
        - January
        - January 2012
        - January, 2012
*/
var parser = __nested_webpack_require_71719__(1);

var ParsedResult = __nested_webpack_require_71719__(0).ParsedResult;

var util = __nested_webpack_require_71719__(4);

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' + '(' + util.MONTH_PATTERN + ')' + '\\s*' + '(?:' + '[,-]?\\s*([0-9]{4})(\\s*BE|AD|BC)?' + ')?' + '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');
var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;

exports.Parser = function ENMonthNameParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var day = 1;
    var monthName = match[MONTH_NAME_GROUP];
    var month = util.MONTH_OFFSET[monthName.toLowerCase()];
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (match[YEAR_BE_GROUP].match(/BE/)) {
          // Buddhist Era
          year = year - 543;
        } else if (match[YEAR_BE_GROUP].match(/BC/)) {
          // Before Christ
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    }

    if (result.text.match(/^\w{3}$/)) {
      return false;
    }

    result.tags['ENMonthNameParser'] = true;
    return result;
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __nested_webpack_require_73745__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Tuesday 11/3/2015 
    - 11/3/2015
    - 11/3

    By default the paser us "middle-endien" format (US English),
    then fallback to little-endian if failed.
    - 11/3/2015 = November 3rd, 2015
    - 23/4/2015 = April 23th, 2015

    If "littleEndian" config is set, the parser will try the little-endian first. 
    - 11/3/2015 = March 11th, 2015
*/
var dayjs = __nested_webpack_require_73745__(2);

var Parser = __nested_webpack_require_73745__(1).Parser;

var ParsedResult = __nested_webpack_require_73745__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:on\\s*?)?' + '((?:sun|mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?)' + '\\s*\\,?\\s*' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'sunday': 0,
  'sun': 0,
  'monday': 1,
  'mon': 1,
  'tuesday': 2,
  'wednesday': 3,
  'wed': 3,
  'thursday': 4,
  'thur': 4,
  'friday': 5,
  'fri': 5,
  'saturday': 6,
  'sat': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;
var WEEKDAY_GROUP = 2;
var FIRST_NUMBERS_GROUP = 3;
var SECOND_NUMBERS_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function ENSlashDateFormatParser(config) {
  Parser.apply(this, arguments);
  config = config || {};
  var littleEndian = config.littleEndian;
  var MONTH_GROUP = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
  var DAY_GROUP = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var date = null;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);

    if (month < 1 || month > 12) {
      if (month > 12) {
        // dd/mm/yyyy date format if day looks like a month, and month
        // looks like a day.
        if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
          // unambiguous
          var tday = month;
          month = day;
          day = tday;
        } else {
          // both month and day are <= 12
          return null;
        }
      }
    }

    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);

    if (match[YEAR_GROUP]) {
      result.start.assign('year', year);
    } else {
      result.start.imply('year', year);
    } //Day of week


    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['ENSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __nested_webpack_require_77421__) {

/*
    Date format with slash "/" between numbers like ENSlashDateFormatParser,
    but this parser expect year before month and date. 
    - YYYY/MM/DD
    - YYYY-MM-DD
    - YYYY.MM.DD
*/
var dayjs = __nested_webpack_require_77421__(2);

var Parser = __nested_webpack_require_77421__(1).Parser;

var ParsedResult = __nested_webpack_require_77421__(0).ParsedResult;

var util = __nested_webpack_require_77421__(4);

var PATTERN = new RegExp('(\\W|^)' + '([0-9]{4})[\\-\\.\\/]' + '((?:' + util.MONTH_PATTERN + '|[0-9]{1,2}))[\\-\\.\\/]' + '([0-9]{1,2})' + '(?=\\W|$)', 'i');
var YEAR_NUMBER_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP = 4;

exports.Parser = function ENSlashDateFormatStartWithYearParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    var month = match[MONTH_NUMBER_GROUP].toLowerCase();
    month = util.MONTH_OFFSET[month] | month;
    result.start.assign('year', parseInt(match[YEAR_NUMBER_GROUP]));
    result.start.assign('month', parseInt(month));
    result.start.assign('day', parseInt(match[DATE_NUMBER_GROUP]));

    if (dayjs(result.start.get('month')) > 12 || dayjs(result.start.get('month')) < 1 || dayjs(result.start.get('day')) > 31 || dayjs(result.start.get('day')) < 1) {
      return null;
    }

    result.tags['ENDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __nested_webpack_require_79064__) {

/*
    Month/Year date format with slash "/" (also "-" and ".") between numbers 
    - 11/05
    - 06/2005
*/
var Parser = __nested_webpack_require_79064__(1).Parser;

var ParsedResult = __nested_webpack_require_79064__(0).ParsedResult;

var PATTERN = new RegExp('(^|[^\\d/]\\s+|[^\\w\\s])' + '([0-9]|0[1-9]|1[012])/([0-9]{4})' + '(?=[^\\d/]|$)', 'i');
var OPENNING_GROUP = 1;
var MONTH_GROUP = 2;
var YEAR_GROUP = 3;

exports.Parser = function ENSlashMonthFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length).trim();
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    var year = match[YEAR_GROUP];
    var month = match[MONTH_GROUP];
    var day = 1;
    month = parseInt(month);
    year = parseInt(year);
    result.start.imply('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year);
    result.tags['ENSlashMonthFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __nested_webpack_require_80321__) {

var dayjs = __nested_webpack_require_80321__(2);

var Parser = __nested_webpack_require_80321__(1).Parser;

var ParsedResult = __nested_webpack_require_80321__(0).ParsedResult;

var util = __nested_webpack_require_80321__(4);

var PATTERN = new RegExp('' + '(\\W|^)' + '(?:within\\s*)?' + '(' + util.TIME_UNIT_PATTERN + ')' + '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');
var STRICT_PATTERN = new RegExp('' + '(\\W|^)' + '(?:within\\s*)?' + '(' + util.TIME_UNIT_STRICT_PATTERN + ')' + 'ago(?=(?:\\W|$))', 'i');

exports.Parser = function ENTimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var fragments = util.extractDateTimeUnitFragments(match[2]);
    var date = dayjs(ref);

    for (var key in fragments) {
      date = date.add(-fragments[key], key);
    }

    if (fragments['hour'] > 0 || fragments['minute'] > 0 || fragments['second'] > 0) {
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.start.assign('second', date.second());
      result.tags['ENTimeAgoFormatParser'] = true;
    }

    if (fragments['d'] > 0 || fragments['month'] > 0 || fragments['year'] > 0) {
      result.start.assign('day', date.date());
      result.start.assign('month', date.month() + 1);
      result.start.assign('year', date.year());
    } else {
      if (fragments['week'] > 0) {
        result.start.imply('weekday', date.day());
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
    }

    return result;
  };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __nested_webpack_require_82408__) {

var dayjs = __nested_webpack_require_82408__(2);

var Parser = __nested_webpack_require_82408__(1).Parser;

var ParsedResult = __nested_webpack_require_82408__(0).ParsedResult;

var ParsedComponents = __nested_webpack_require_82408__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:at|from)\\s*)??" + "(\\d{1,4}|noon|midnight)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})(?:\\.(\\d{1,6}))?" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?|O\\W*CLOCK))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|to|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?|O\\W*CLOCK))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var MILLI_SECOND_GROUP = 5;
var AM_PM_HOUR_GROUP = 6;

exports.Parser = function ENTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlapped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['ENTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Millisecond

    if (match[MILLI_SECOND_GROUP] != null) {
      var millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
      if (millisecond >= 1000) return null;
      result.start.assign('millisecond', millisecond);
    } // ----- Second


    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (match[HOUR_GROUP].toLowerCase() == "noon") {
      meridiem = 1;
      hour = 12;
    } else if (match[HOUR_GROUP].toLowerCase() == "midnight") {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM  


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;
        if (hour == 12) hour = 0;
      }

      if (ampm == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } else {
      if (hour < 12) {
        result.start.imply('meridiem', 0);
      } else {
        result.start.imply('meridiem', 1);
      }
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Millisecond

    if (match[MILLI_SECOND_GROUP] != null) {
      var millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
      if (millisecond >= 1000) return null;
      result.end.assign('millisecond', millisecond);
    } // ----- Second


    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM 


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      }

      if (ampm == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }

      if (!result.start.isCertain('meridiem')) {
        if (meridiem == 0) {
          result.start.imply('meridiem', 0);

          if (result.start.get('hour') == 12) {
            result.start.assign('hour', 0);
          }
        } else {
          result.start.imply('meridiem', 1);

          if (result.start.get('hour') != 12) {
            result.start.assign('hour', result.start.get('hour') + 12);
          }
        }
      }
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    } else {
      var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == 1;

      if (startAtPM && result.start.get('hour') > hour) {
        // 10pm - 1 (am)
        result.end.imply('meridiem', 0);
      } else if (hour > 12) {
        result.end.imply('meridiem', 1);
      }
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __nested_webpack_require_88961__) {

var dayjs = __nested_webpack_require_88961__(2);

var Parser = __nested_webpack_require_88961__(1).Parser;

var ParsedResult = __nested_webpack_require_88961__(0).ParsedResult;

var util = __nested_webpack_require_88961__(4);

var PATTERN = new RegExp('' +
/*match[1]*/
'(\\W|^)' +
/*match[2]*/
'(in )?' +
/*match[3]*/
'(' + util.TIME_UNIT_PATTERN + ')' +
/*match[4]*/
'(later|after|from now|henceforth|forward|out)?' +
/*match[5]*/
'(?=(?:\\W|$))', 'i');
var STRICT_PATTERN = new RegExp('' +
/*match[1]*/
'(\\W|^)' +
/*match[2]*/
'(in )?' +
/*match[3]*/
'(' + util.TIME_UNIT_STRICT_PATTERN + ')' +
/*match[4]*/
'(later|from now)?' +
/*match[5]*/
'(?=(?:\\W|$))', 'i');

exports.Parser = function ENTimeLaterFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var prefix = match[2];
    var suffix = match[4];
    if (!prefix && !suffix) return null;
    var preamble = match[1];
    var text = match[0].substr(preamble.length, match[0].length - preamble.length);
    var index = match.index + preamble.length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var fragments = util.extractDateTimeUnitFragments(match[3]);
    var date = dayjs(ref);

    for (var key in fragments) {
      date = date.add(fragments[key], key);
    }

    if (fragments['hour'] > 0 || fragments['minute'] > 0 || fragments['second'] > 0) {
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.start.assign('second', date.second());
      result.tags['ENTimeAgoFormatParser'] = true;
    }

    if (fragments['d'] > 0 || fragments['month'] > 0 || fragments['year'] > 0) {
      result.start.assign('day', date.date());
      result.start.assign('month', date.month() + 1);
      result.start.assign('year', date.year());
    } else {
      if (fragments['week'] > 0) {
        result.start.imply('weekday', date.day());
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
    }

    return result;
  };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __nested_webpack_require_91312__) {

var dayjs = __nested_webpack_require_91312__(2);

var Parser = __nested_webpack_require_91312__(1).Parser;

var ParsedResult = __nested_webpack_require_91312__(0).ParsedResult;

var PATTERN = /(\W|^)(now|today|tonight|last\s*night|(?:tomorrow|tmr|yesterday)\s*|tomorrow|tmr|yesterday)(?=\W|$)/i;

exports.Parser = function ENCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;
    var lowerText = text.toLowerCase();

    if (lowerText == 'tonight') {
      // Normally means this coming midnight
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (/^tomorrow|^tmr/.test(lowerText)) {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (/^yesterday/.test(lowerText)) {
      startMoment = startMoment.add(-1, 'day');
    } else if (lowerText.match(/last\s*night/)) {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText.match("now")) {
      result.start.assign('hour', refMoment.hour());
      result.start.assign('minute', refMoment.minute());
      result.start.assign('second', refMoment.second());
      result.start.assign('millisecond', refMoment.millisecond());
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['ENCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __nested_webpack_require_93276__) {

var Parser = __nested_webpack_require_93276__(1).Parser;

var ParsedResult = __nested_webpack_require_93276__(0).ParsedResult;

var PATTERN = /(\W|^)((this)?\s*(morning|afternoon|evening|noon|night))/i;
var TIME_MATCH = 4;

exports.Parser = function ENCasualTimeParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    if (!match[TIME_MATCH]) TIME_MATCH = 3;

    switch (match[TIME_MATCH].toLowerCase()) {
      case 'afternoon':
        result.start.imply('meridiem', 1);
        result.start.imply('hour', 15);
        break;

      case 'evening':
      case 'night':
        result.start.imply('meridiem', 1);
        result.start.imply('hour', 20);
        break;

      case 'morning':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 6);
        break;

      case 'noon':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 12);
        break;
    }

    result.tags['ENCasualTimeParser'] = true;
    return result;
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __nested_webpack_require_94609__) {

var dayjs = __nested_webpack_require_94609__(2);

var parser = __nested_webpack_require_94609__(1);

var ParsedResult = __nested_webpack_require_94609__(0).ParsedResult;

var util = __nested_webpack_require_94609__(29);

var PATTERN = /(?:(同|今|本|((昭和|平成|令和)?([0-9０-９]{1,4}|元)))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
var SPECIAL_YEAR_GROUP = 1;
var TYPICAL_YEAR_GROUP = 2;
var ERA_GROUP = 3;
var YEAR_NUMBER_GROUP = 4;
var MONTH_GROUP = 5;
var DAY_GROUP = 6;

exports.Parser = function JPStandardParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0],
      index: match.index,
      ref: ref
    });
    var month = match[MONTH_GROUP];
    month = util.toHankaku(month);
    month = parseInt(month);
    var day = match[DAY_GROUP];
    day = util.toHankaku(day);
    day = parseInt(day);
    result.start.assign('day', day);
    result.start.assign('month', month);

    if (match[TYPICAL_YEAR_GROUP]) {
      var year = match[YEAR_NUMBER_GROUP];

      if (year == '元') {
        year = 1;
      } else {
        year = util.toHankaku(year);
        year = parseInt(year);
      }

      if (match[ERA_GROUP] == '令和') {
        year += 2018;
      } else if (match[ERA_GROUP] == '平成') {
        year += 1988;
      } else if (match[ERA_GROUP] == '昭和') {
        year += 1925;
      }

      result.start.assign('year', year);
    } else if (match[SPECIAL_YEAR_GROUP] && match[SPECIAL_YEAR_GROUP].match('同|今|本')) {
      var moment = dayjs(ref);
      result.start.assign('year', moment.year());
    } else {
      var _year = parser.findYearClosestToRef(ref, day, month);

      result.start.imply('year', _year);
    }

    result.tags['JPStandardParser'] = true;
    return result;
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * to-hankaku.js
 * convert to ascii code strings.
 *
 * @version 1.0.1
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
exports.toHankaku = function (String, fromCharCode) {
  function toHankaku(string) {
    return String(string).replace(/\u2019/g, "'").replace(/\u201D/g, "\"").replace(/\u3000/g, " ").replace(/\uFFE5/g, "\xA5").replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, alphaNum);
  }

  function alphaNum(token) {
    return fromCharCode(token.charCodeAt(0) - 65248);
  }

  return toHankaku;
}(String, String.fromCharCode);
/**
 * to-zenkaku.js
 * convert to multi byte strings.
 *
 * @version 1.0.2
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */


exports.toZenkaku = function (String, fromCharCode) {
  function toZenkaku(string) {
    return String(string).replace(/\u0020/g, "\u3000").replace(/\u0022/g, "\u201D").replace(/\u0027/g, "\u2019").replace(/\u00A5/g, "\uFFE5").replace(/[!#-&(),-9\u003C-?A-[\u005D_a-{}~]/g, alphaNum);
  }

  function alphaNum(token) {
    return fromCharCode(token.charCodeAt(0) + 65248);
  }

  return toZenkaku;
}(String, String.fromCharCode);

/***/ }),
/* 30 */
/***/ (function(module, exports, __nested_webpack_require_97911__) {

var dayjs = __nested_webpack_require_97911__(2);

var Parser = __nested_webpack_require_97911__(1).Parser;

var ParsedResult = __nested_webpack_require_97911__(0).ParsedResult;

var PATTERN = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;

exports.Parser = function JPCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index;
    var text = match[0];
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;

    if (text == '今夜' || text == '今夕' || text == '今晩') {
      // Normally means this coming midnight 
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (text == '明日') {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 4) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (text == '昨日') {
      startMoment = startMoment.add(-1, 'day');
    } else if (text.match("今朝")) {
      result.start.imply('hour', 6);
      result.start.imply('meridiem', 0);
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['JPCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __nested_webpack_require_99362__) {

var dayjs = __nested_webpack_require_99362__(2);

var Parser = __nested_webpack_require_99362__(1).Parser;

var ParsedResult = __nested_webpack_require_99362__(0).ParsedResult;
/*
  Valid patterns:
  - esta manhã -> today in the morning
  - esta tarde -> today in the afternoon/evening
  - esta noite -> tonight
  - ontem de -> yesterday in the morning
  - ontem a tarde -> yesterday in the afternoon/evening
  - ontem a noite -> yesterday at night
  - amanhã de manhã -> tomorrow in the morning
  - amanhã a tarde -> tomorrow in the afternoon/evening
  - amanhã a noite -> tomorrow at night
  - hoje -> today
  - ontem -> yesterday
  - amanhã -> tomorrow
 */


var PATTERN = /(\W|^)(agora|esta\s*(manhã|tarde|noite)|(ontem|amanhã)\s*(de|à)\s*(manhã|tarde|noite)|hoje|amanhã|ontem|noite)(?=\W|$)/i;

exports.Parser = function PTCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;
    var lowerText = text.toLowerCase().replace(/\s+/g, ' ');

    if (lowerText == 'amanhã') {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (lowerText == 'ontem') {
      startMoment = startMoment.add(-1, 'day');
    } else if (lowerText == 'noite') {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText.match("esta")) {
      var secondMatch = match[3].toLowerCase();

      if (secondMatch == "tarde") {
        result.start.imply('hour', 18);
      } else if (secondMatch == "manhã") {
        result.start.imply('hour', 6);
      } else if (secondMatch == "noite") {
        // Normally means this coming midnight
        result.start.imply('hour', 22);
        result.start.imply('meridiem', 1);
      }
    } else if (lowerText.match(/de|à/)) {
      var firstMatch = match[4].toLowerCase();

      if (firstMatch === 'ontem') {
        startMoment = startMoment.add(-1, 'day');
      } else if (firstMatch === 'amanhã') {
        startMoment = startMoment.add(1, 'day');
      }

      var secondMatch = match[6].toLowerCase();

      if (secondMatch == "tarde") {
        result.start.imply('hour', 18);
      } else if (secondMatch == "manhã") {
        result.start.imply('hour', 9);
      } else if (secondMatch == "noite") {
        // Normally means this coming midnight
        result.start.imply('hour', 22);
        result.start.imply('meridiem', 1);
      }
    } else if (lowerText.match("agora")) {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['PTCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __nested_webpack_require_102749__) {

var dayjs = __nested_webpack_require_102749__(2);

var Parser = __nested_webpack_require_102749__(1).Parser;

var ParsedResult = __nested_webpack_require_102749__(0).ParsedResult;

var PATTERN = /(\W|^)(dentro\s*de|em|em*até)\s*([0-9]+|mei[oa]|uma?)\s*(minutos?|horas?|dias?)\s*(?=(?:\W|$))/i;

exports.Parser = function PTDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = parseInt(match[3]);

    if (isNaN(num)) {
      if (match[3].match(/(meio|meia)/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[4].match(/dia/)) {
      date = date.add(num, 'd');
      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (match[4].match(/hora/)) {
      date = date.add(num, 'hour');
    } else if (match[4].match(/minuto/)) {
      date = date.add(num, 'minute');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.tags['PTDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __nested_webpack_require_104432__) {

var parser = __nested_webpack_require_104432__(1);

var ParsedResult = __nested_webpack_require_104432__(0).ParsedResult;

var util = __nested_webpack_require_104432__(34);

var DAYS_OFFSET = util.WEEKDAY_OFFSET;
var PATTERN = new RegExp('(\\W|^)' + '(?:(domingo|segunda|segunda-feira|terça|terça-feira|quarta|quarta-feira|quinta|quinta-feira|sexta|sexta-feira|sábado|sabado|dom|seg|ter|qua|qui|sex|sab)\\s*,?\\s*)?' + '([0-9]{1,2})(?:º|ª|°)?' + '(?:\\s*(?:desde|de|\\-|\\–|ao?|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*' + '(Jan(?:eiro|\\.)?|Fev(?:ereiro|\\.)?|Mar(?:ço|\\.)?|Abr(?:il|\\.)?|Mai(?:o|\\.)?|Jun(?:ho|\\.)?|Jul(?:ho|\\.)?|Ago(?:sto|\\.)?|Set(?:embro|\\.)?|Out(?:ubro|\\.)?|Nov(?:embro|\\.)?|Dez(?:embro|\\.)?)' + '(?:\\s*(?:de?)?(\\s*[0-9]{1,4}(?![^\\s]\\d))(\\s*[ad]\\.?\\s*c\\.?|a\\.?\\s*d\\.?)?)?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function PTMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (/a\.?\s*c\.?/i.test(match[YEAR_BE_GROUP])) {
          // antes de Cristo
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 January 2012'


    if (match[DATE_TO_GROUP]) {
      result.end = result.start.clone();
      result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
    }

    result.tags['PTMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'segunda': 1,
  'segunda-feira': 1,
  'seg': 1,
  'terça': 2,
  'terca': 2,
  'terça-feira': 2,
  'terca-feira': 2,
  'ter': 2,
  'quarta': 3,
  'quarta-feira': 3,
  'qua': 3,
  'quinta': 4,
  'quinta-feira': 4,
  'qui': 4,
  'sexta': 5,
  'sexta-feira': 5,
  'sex': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
exports.MONTH_OFFSET = {
  'janeiro': 1,
  'jan': 1,
  'jan.': 1,
  'fevereiro': 2,
  'fev': 2,
  'fev.': 2,
  'março': 3,
  'mar': 3,
  'mar.': 3,
  'abril': 4,
  'abr': 4,
  'abr.': 4,
  'maio': 5,
  'mai': 5,
  'mai.': 5,
  'junho': 6,
  'jun': 6,
  'jun.': 6,
  'julho': 7,
  'jul': 7,
  'jul.': 7,
  'agosto': 8,
  'ago': 8,
  'ago.': 8,
  'setembro': 9,
  'set': 9,
  'set.': 9,
  'outubro': 10,
  'out': 10,
  'out.': 10,
  'novembro': 11,
  'nov': 11,
  'nov.': 11,
  'dezembro': 12,
  'dez': 12,
  'dez.': 12
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __nested_webpack_require_108118__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var dayjs = __nested_webpack_require_108118__(2);

var Parser = __nested_webpack_require_108118__(1).Parser;

var ParsedResult = __nested_webpack_require_108118__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '((?:domingo|dom|segunda|segunda-feira|seg|terça|terça-feira|ter|quarta|quarta-feira|qua|quinta|quinta-feira|qui|sexta|sexta-feira|sex|s[áa]bado|sab))' + '\\s*\\,?\\s*' + ')?' + '([0-1]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'segunda': 1,
  'segunda-feira': 1,
  'seg': 1,
  'terça': 2,
  'terça-feira': 2,
  'ter': 2,
  'quarta': 3,
  'quarta-feira': 3,
  'qua': 3,
  'quinta': 4,
  'quinta-feira': 4,
  'qui': 4,
  'sexta': 5,
  'sexta-feira': 5,
  'sex': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6; // in Spanish we use day/month/year

var WEEKDAY_GROUP = 2;
var MONTH_GROUP = 4;
var DAY_GROUP = 3;
var YEAR_GROUP = 5;

exports.Parser = function PTSlashDateFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var date = null;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);

    if (month < 1 || month > 12) {
      if (month > 12) {
        // dd/mm/yyyy date format if day looks like a month, and month
        // looks like a day.
        if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
          // unambiguous
          var tday = month;
          month = day;
          day = tday;
        } else {
          // both month and day are <= 12
          return null;
        }
      }
    }

    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year); //Day of week

    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['PTSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __nested_webpack_require_111382__) {

var dayjs = __nested_webpack_require_111382__(2);

var Parser = __nested_webpack_require_111382__(1).Parser;

var ParsedResult = __nested_webpack_require_111382__(0).ParsedResult;

var PATTERN = /(\W|^)há\s*([0-9]+|mei[oa]|uma?)\s*(minutos?|horas?|semanas?|dias?|mes(es)?|anos?)(?=(?:\W|$))/i;

exports.Parser = function PTTimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = parseInt(match[2]);

    if (isNaN(num)) {
      if (match[2].match(/mei/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[3].match(/hora/) || match[3].match(/minuto/)) {
      if (match[3].match(/hora/)) {
        date = date.add(-num, 'hour');
      } else if (match[3].match(/minuto/)) {
        date = date.add(-num, 'minute');
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.tags['PTTimeAgoFormatParser'] = true;
      return result;
    }

    if (match[3].match(/semana/)) {
      date = date.add(-num, 'week');
      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.imply('weekday', date.day());
      return result;
    }

    if (match[3].match(/dia/)) {
      date = date.add(-num, 'd');
    }

    if (match[3].match(/mes/)) {
      date = date.add(-num, 'month');
    }

    if (match[3].match(/ano/)) {
      date = date.add(-num, 'year');
    }

    result.start.assign('day', date.date());
    result.start.assign('month', date.month() + 1);
    result.start.assign('year', date.year());
    return result;
  };
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __nested_webpack_require_113669__) {

var dayjs = __nested_webpack_require_113669__(2);

var Parser = __nested_webpack_require_113669__(1).Parser;

var ParsedResult = __nested_webpack_require_113669__(0).ParsedResult;

var ParsedComponents = __nested_webpack_require_113669__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:ao?|às?|das|da|de|do)\\s*)?" + "(\\d{1,4}|meio-dia|meia-noite|meio dia|meia noite)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|a(?:o)?|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function PTTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['PTTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (match[HOUR_GROUP].toLowerCase().match(/meio\-di/)) {
      meridiem = 1;
      hour = 12;
    } else if (match[HOUR_GROUP].toLowerCase() == "meia-noite") {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;
        if (hour == 12) hour = 0;
      }

      if (ampm == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;

      if (match[AM_PM_HOUR_GROUP][0].toLowerCase() == "a") {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      }

      if (match[AM_PM_HOUR_GROUP][0].toLowerCase() == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }

      if (!result.start.isCertain('meridiem')) {
        if (meridiem == 0) {
          result.start.imply('meridiem', 0);

          if (result.start.get('hour') == 12) {
            result.start.assign('hour', 0);
          }
        } else {
          result.start.imply('meridiem', 1);

          if (result.start.get('hour') != 12) {
            result.start.assign('hour', result.start.get('hour') + 12);
          }
        }
      }
    } else if (hour >= 12) {
      meridiem = 1;
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __nested_webpack_require_119401__) {

var Parser = __nested_webpack_require_119401__(1).Parser;

var ParsedResult = __nested_webpack_require_119401__(0).ParsedResult;

var updateParsedComponent = __nested_webpack_require_119401__(6).updateParsedComponent;

var DAYS_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'segunda': 1,
  'segunda-feira': 1,
  'seg': 1,
  'terça': 2,
  'terça-feira': 2,
  'ter': 2,
  'quarta': 3,
  'quarta-feira': 3,
  'qua': 3,
  'quinta': 4,
  'quinta-feira': 4,
  'qui': 4,
  'sexta': 5,
  'sexta-feira': 5,
  'sex': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:(este|esta|passado|pr[oó]ximo)\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(este|esta|passado|pr[óo]ximo)\\s*semana)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function PTWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var modifier = null;
    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];

    if (prefix || postfix) {
      var norm = prefix || postfix;
      norm = norm.toLowerCase();

      if (norm == 'passado') {
        modifier = 'this';
      } else if (norm == 'próximo' || norm == 'proximo') {
        modifier = 'next';
      } else if (norm == 'este') {
        modifier = 'this';
      }
    }

    updateParsedComponent(result, ref, offset, modifier);
    result.tags['PTWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __nested_webpack_require_121424__) {

var dayjs = __nested_webpack_require_121424__(2);

var Parser = __nested_webpack_require_121424__(1).Parser;

var ParsedResult = __nested_webpack_require_121424__(0).ParsedResult;
/*
  Valid patterns:
  - esta mañana -> today in the morning
  - esta tarde -> today in the afternoon/evening
  - esta noche -> tonight
  - ayer por la mañana -> yesterday in the morning
  - ayer por la tarde -> yesterday in the afternoon/evening
  - ayer por la noche -> yesterday at night
  - mañana por la mañana -> tomorrow in the morning
  - mañana por la tarde -> tomorrow in the afternoon/evening
  - mañana por la noche -> tomorrow at night
  - anoche -> tomorrow at night
  - hoy -> today
  - ayer -> yesterday
  - mañana -> tomorrow
 */


var PATTERN = /(\W|^)(ahora|esta\s*(mañana|tarde|noche)|(ayer|mañana)\s*por\s*la\s*(mañana|tarde|noche)|hoy|mañana|ayer|anoche)(?=\W|$)/i;

exports.Parser = function ESCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;
    var lowerText = text.toLowerCase().replace(/\s+/g, ' ');

    if (lowerText == 'mañana') {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (lowerText == 'ayer') {
      startMoment = startMoment.add(-1, 'day');
    } else if (lowerText == 'anoche') {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText.match("esta")) {
      var secondMatch = match[3].toLowerCase();

      if (secondMatch == "tarde") {
        result.start.imply('hour', 18);
      } else if (secondMatch == "mañana") {
        result.start.imply('hour', 6);
      } else if (secondMatch == "noche") {
        // Normally means this coming midnight
        result.start.imply('hour', 22);
        result.start.imply('meridiem', 1);
      }
    } else if (lowerText.match(/por\s*la/)) {
      var firstMatch = match[4].toLowerCase();

      if (firstMatch === 'ayer') {
        startMoment = startMoment.add(-1, 'day');
      } else if (firstMatch === 'mañana') {
        startMoment = startMoment.add(1, 'day');
      }

      var secondMatch = match[5].toLowerCase();

      if (secondMatch == "tarde") {
        result.start.imply('hour', 18);
      } else if (secondMatch == "mañana") {
        result.start.imply('hour', 9);
      } else if (secondMatch == "noche") {
        // Normally means this coming midnight
        result.start.imply('hour', 22);
        result.start.imply('meridiem', 1);
      }
    } else if (lowerText.match("ahora")) {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['ESCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __nested_webpack_require_124882__) {

var dayjs = __nested_webpack_require_124882__(2);

var Parser = __nested_webpack_require_124882__(1).Parser;

var ParsedResult = __nested_webpack_require_124882__(0).ParsedResult;

var PATTERN = /(\W|^)(dentro\s*de|en)\s*([0-9]+|medi[oa]|una?)\s*(minutos?|horas?|d[ií]as?)\s*(?=(?:\W|$))/i;

exports.Parser = function ESDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = parseInt(match[3]);

    if (isNaN(num)) {
      if (match[3].match(/medi/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[4].match(/d[ií]a/)) {
      date = date.add(num, 'd');
      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (match[4].match(/hora/)) {
      date = date.add(num, 'hour');
    } else if (match[4].match(/minuto/)) {
      date = date.add(num, 'minute');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.tags['ESDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __nested_webpack_require_126558__) {

var dayjs = __nested_webpack_require_126558__(2);

var Parser = __nested_webpack_require_126558__(1).Parser;

var ParsedResult = __nested_webpack_require_126558__(0).ParsedResult;

var PATTERN = /(\W|^)hace\s*([0-9]+|medi[oa]|una?)\s*(minutos?|horas?|semanas?|d[ií]as?|mes(es)?|años?)(?=(?:\W|$))/i;

exports.Parser = function ESTimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = parseInt(match[2]);

    if (isNaN(num)) {
      if (match[2].match(/medi/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[3].match(/hora/) || match[3].match(/minuto/)) {
      if (match[3].match(/hora/)) {
        date = date.add(-num, 'hour');
      } else if (match[3].match(/minuto/)) {
        date = date.add(-num, 'minute');
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.tags['ESTimeAgoFormatParser'] = true;
      return result;
    }

    if (match[3].match(/semana/)) {
      date = date.add(-num, 'week');
      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.imply('weekday', date.day());
      return result;
    }

    if (match[3].match(/d[ií]a/)) {
      date = date.add(-num, 'd');
    }

    if (match[3].match(/mes/)) {
      date = date.add(-num, 'month');
    }

    if (match[3].match(/año/)) {
      date = date.add(-num, 'year');
    }

    result.start.assign('day', date.date());
    result.start.assign('month', date.month() + 1);
    result.start.assign('year', date.year());
    return result;
  };
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __nested_webpack_require_128855__) {

var dayjs = __nested_webpack_require_128855__(2);

var Parser = __nested_webpack_require_128855__(1).Parser;

var ParsedResult = __nested_webpack_require_128855__(0).ParsedResult;

var ParsedComponents = __nested_webpack_require_128855__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:a las?|al?|desde|de)\\s*)?" + "(\\d{1,4}|mediod[ií]a|medianoche)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|a(?:\s*las)?|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function ESTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['ESTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (match[HOUR_GROUP].toLowerCase().match(/mediod/)) {
      meridiem = 1;
      hour = 12;
    } else if (match[HOUR_GROUP].toLowerCase() == "medianoche") {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;
        if (hour == 12) hour = 0;
      }

      if (ampm == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;

      if (match[AM_PM_HOUR_GROUP][0].toLowerCase() == "a") {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      }

      if (match[AM_PM_HOUR_GROUP][0].toLowerCase() == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }

      if (!result.start.isCertain('meridiem')) {
        if (meridiem == 0) {
          result.start.imply('meridiem', 0);

          if (result.start.get('hour') == 12) {
            result.start.assign('hour', 0);
          }
        } else {
          result.start.imply('meridiem', 1);

          if (result.start.get('hour') != 12) {
            result.start.assign('hour', result.start.get('hour') + 12);
          }
        }
      }
    } else if (hour >= 12) {
      meridiem = 1;
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __nested_webpack_require_134572__) {

var Parser = __nested_webpack_require_134572__(1).Parser;

var ParsedResult = __nested_webpack_require_134572__(0).ParsedResult;

var updateParsedComponent = __nested_webpack_require_134572__(6).updateParsedComponent;

var DAYS_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'lunes': 1,
  'lun': 1,
  'martes': 2,
  'mar': 2,
  'miercoles': 3,
  'miércoles': 3,
  'mie': 3,
  'jueves': 4,
  'jue': 4,
  'viernes': 5,
  'vier': 5,
  'sabado': 6,
  'sábado': 6,
  'sab': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:(este|pasado|pr[oó]ximo)\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(este|pasado|pr[óo]ximo)\\s*week)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function ESWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var modifier = null;
    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];

    if (prefix || postfix) {
      var norm = prefix || postfix;
      norm = norm.toLowerCase();

      if (norm == 'pasado') {
        modifier = 'this';
      } else if (norm == 'próximo' || norm == 'proximo') {
        modifier = 'next';
      } else if (norm == 'este') {
        modifier = 'this';
      }
    }

    updateParsedComponent(result, ref, offset, modifier);
    result.tags['ESWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __nested_webpack_require_136499__) {

var parser = __nested_webpack_require_136499__(1);

var ParsedResult = __nested_webpack_require_136499__(0).ParsedResult;

var util = __nested_webpack_require_136499__(45);

var DAYS_OFFSET = util.WEEKDAY_OFFSET;
var PATTERN = new RegExp('(\\W|^)' + '(?:(Domingo|Lunes|Martes|Miércoles|Miercoles|Jueves|Viernes|Sábado|Sabado|Dom|Lun|Mar|Mie|Jue|Vie|Sab)\\s*,?\\s*)?' + '([0-9]{1,2})(?:º|ª|°)?' + '(?:\\s*(?:desde|de|\\-|\\–|al?|hasta|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*' + '(Ene(?:ro|\\.)?|Feb(?:rero|\\.)?|Mar(?:zo|\\.)?|Abr(?:il|\\.)?|May(?:o|\\.)?|Jun(?:io|\\.)?|Jul(?:io|\\.)?|Ago(?:sto|\\.)?|Sep(?:tiembre|\\.)?|Set(?:iembre|\\.)?|Oct(?:ubre|\\.)?|Nov(?:iembre|\\.)?|Dic(?:iembre|\\.)?)' + '(?:\\s*(?:del?)?(\\s*[0-9]{1,4}(?![^\\s]\\d))(\\s*[ad]\\.?\\s*c\\.?|a\\.?\\s*d\\.?)?)?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function ESMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (/a\.?\s*c\.?/i.test(match[YEAR_BE_GROUP])) {
          // antes de Cristo
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 January 2012'


    if (match[DATE_TO_GROUP]) {
      result.end = result.start.clone();
      result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
    }

    result.tags['ESMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'lunes': 1,
  'lun': 1,
  'martes': 2,
  'mar': 2,
  'miércoles': 3,
  'miercoles': 3,
  'mie': 3,
  'jueves': 4,
  'jue': 4,
  'viernes': 5,
  'vie': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
exports.MONTH_OFFSET = {
  'enero': 1,
  'ene': 1,
  'ene.': 1,
  'febrero': 2,
  'feb': 2,
  'feb.': 2,
  'marzo': 3,
  'mar': 3,
  'mar.': 3,
  'abril': 4,
  'abr': 4,
  'abr.': 4,
  'mayo': 5,
  'may': 5,
  'may.': 5,
  'junio': 6,
  'jun': 6,
  'jun.': 6,
  'julio': 7,
  'jul': 7,
  'jul.': 7,
  'agosto': 8,
  'ago': 8,
  'ago.': 8,
  'septiembre': 9,
  'sep': 9,
  'sept': 9,
  'sep.': 9,
  'sept.': 9,
  'octubre': 10,
  'oct': 10,
  'oct.': 10,
  'noviembre': 11,
  'nov': 11,
  'nov.': 11,
  'diciembre': 12,
  'dic': 12,
  'dic.': 12
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __nested_webpack_require_140072__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var dayjs = __nested_webpack_require_140072__(2);

var Parser = __nested_webpack_require_140072__(1).Parser;

var ParsedResult = __nested_webpack_require_140072__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '((?:domingo|dom|lunes|lun|martes|mar|mi[ée]rcoles|mie|jueves|jue|viernes|vie|s[áa]bado|sab))' + '\\s*\\,?\\s*' + ')?' + '([0-1]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'lunes': 1,
  'lun': 1,
  'martes': 2,
  'mar': 2,
  'miercoles': 3,
  'miércoles': 3,
  'mie': 3,
  'jueves': 4,
  'jue': 4,
  'viernes': 5,
  'vier': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6; // in Spanish we use day/month/year

var WEEKDAY_GROUP = 2;
var MONTH_GROUP = 4;
var DAY_GROUP = 3;
var YEAR_GROUP = 5;

exports.Parser = function ESSlashDateFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var date = null;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);

    if (month < 1 || month > 12) {
      if (month > 12) {
        // dd/mm/yyyy date format if day looks like a month, and month
        // looks like a day.
        if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
          // unambiguous
          var tday = month;
          month = day;
          day = tday;
        } else {
          // both month and day are <= 12
          return null;
        }
      }
    }

    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year); //Day of week

    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['ESSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __nested_webpack_require_143198__) {

var dayjs = __nested_webpack_require_143198__(2);

var Parser = __nested_webpack_require_143198__(1).Parser;

var ParsedResult = __nested_webpack_require_143198__(0).ParsedResult;

var PATTERN = /(\W|^)(maintenant|aujourd'hui|ajd|cette\s*nuit|la\s*veille|(demain|hier)(\s*(matin|soir|aprem|après-midi))?|ce\s*(matin|soir)|cet\s*(après-midi|aprem))(?=\W|$)/i;

exports.Parser = function FRCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;
    var lowerText = text.toLowerCase();

    if (lowerText.match(/demain/)) {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    }

    if (lowerText.match(/hier/)) {
      startMoment = startMoment.add(-1, 'day');
    }

    if (lowerText.match(/cette\s*nuit/)) {
      // Normally means this coming midnight
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (lowerText.match(/la\s*veille/)) {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText.match(/(après-midi|aprem)/)) {
      result.start.imply('hour', 14);
    } else if (lowerText.match(/(soir)/)) {
      result.start.imply('hour', 18);
    } else if (lowerText.match(/matin/)) {
      result.start.imply('hour', 8);
    } else if (lowerText.match("maintenant")) {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['FRCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __nested_webpack_require_145477__) {

var dayjs = __nested_webpack_require_145477__(2);

var Parser = __nested_webpack_require_145477__(1).Parser;

var ParsedResult = __nested_webpack_require_145477__(0).ParsedResult;

var util = __nested_webpack_require_145477__(10);

var PATTERN = new RegExp('(\\W|^)' + '(dans|en)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|une?|(?:\\s*quelques)?|demi(?:\\s*|-?)?)\\s*' + '(secondes?|min(?:ute)?s?|heures?|jours?|semaines?|mois|années?)\\s*' + '(?=\\W|$)', 'i');
var STRICT_PATTERN = new RegExp('(\\W|^)' + '(dans|en)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|un?)\\s*' + '(secondes?|minutes?|heures?|jours?)\\s*' + '(?=\\W|$)', 'i');

exports.Parser = function FRDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = match[3];

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === 'un' || num === 'une') {
      num = 1;
    } else if (num.match(/quelques?/i)) {
      num = 3;
    } else if (num.match(/demi-?/i)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    var date = dayjs(ref);

    if (match[4].match(/jour|semaine|mois|année/i)) {
      if (match[4].match(/jour/)) {
        date = date.add(num, 'd');
      } else if (match[4].match(/semaine/i)) {
        date = date.add(num * 7, 'd');
      } else if (match[4].match(/mois/i)) {
        date = date.add(num, 'month');
      } else if (match[4].match(/année/i)) {
        date = date.add(num, 'year');
      }

      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (match[4].match(/heure/i)) {
      date = date.add(num, 'hour');
    } else if (match[4].match(/min/i)) {
      date = date.add(num, 'minutes');
    } else if (match[4].match(/secondes/i)) {
      date = date.add(num, 'second');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.start.assign('second', date.second());
    result.tags['FRDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __nested_webpack_require_148165__) {

var parser = __nested_webpack_require_148165__(1);

var ParsedResult = __nested_webpack_require_148165__(0).ParsedResult;

var util = __nested_webpack_require_148165__(10);

var DAYS_OFFSET = util.WEEKDAY_OFFSET;
var PATTERN = new RegExp('(\\W|^)' + '(?:(Dimanche|Lundi|Mardi|mercredi|Jeudi|Vendredi|Samedi|Dim|Lun|Mar|Mer|Jeu|Ven|Sam)\\s*,?\\s*)?' + '([0-9]{1,2}|1er)' + '(?:\\s*(?:au|\\-|\\–|jusqu\'au?|\\s)\\s*([0-9]{1,2})(?:er)?)?\\s*(?:de)?\\s*' + '(Jan(?:vier|\\.)?|F[ée]v(?:rier|\\.)?|Mars|Avr(?:il|\\.)?|Mai|Juin|Juil(?:let|\\.)?|Ao[uû]t|Sept(?:embre|\\.)?|Oct(?:obre|\\.)?|Nov(?:embre|\\.)?|d[ée]c(?:embre|\\.)?)' + '(?:\\s*(\\s*[0-9]{1,4}(?![^\\s]\\d))(?:\\s*(AC|[ap]\\.?\\s*c(?:h(?:r)?)?\\.?\\s*n\\.?))?)?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function FRMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (/a/i.test(match[YEAR_BE_GROUP])) {
          // Ante Christe natum
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 janvier 2012'


    if (match[DATE_TO_GROUP]) {
      result.end = result.start.clone();
      result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
    }

    result.tags['FRMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __nested_webpack_require_150794__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var parser = __nested_webpack_require_150794__(1);

var ParsedResult = __nested_webpack_require_150794__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '((?:dimanche|dim|lundi|lun|mardi|mar|mercredi|mer|jeudi|jeu|vendredi|ven|samedi|sam|le))' + '\\s*\\,?\\s*' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'dimanche': 0,
  'dim': 0,
  'lundi': 1,
  'lun': 1,
  'mardi': 2,
  'mar': 2,
  'mercredi': 3,
  'mer': 3,
  'jeudi': 4,
  'jeu': 4,
  'vendredi': 5,
  'ven': 5,
  'samedi': 6,
  'sam': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6; // In French we use day/month/year

var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function FRSlashDateFormatParser(argument) {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var date = null;
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    day = parseInt(day);
    month = parseInt(month);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (year < 100) {
        year = year + 2000;
      }
    }

    if (month < 1 || month > 12) {
      if (month > 12) {
        // dd/mm/yyyy date format if day looks like a month, and month looks like a day.
        if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
          // unambiguous
          var tday = month;
          month = day;
          day = tday;
        } else {
          // both month and day are <= 12
          return null;
        }
      }
    }

    if (day < 1 || day > 31) return null;

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Day of week


    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['FRSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __nested_webpack_require_154022__) {

var dayjs = __nested_webpack_require_154022__(2);

var Parser = __nested_webpack_require_154022__(1).Parser;

var ParsedResult = __nested_webpack_require_154022__(0).ParsedResult;

var PATTERN = /(\W|^)il y a\s*([0-9]+|une?)\s*(minutes?|heures?|semaines?|jours?|mois|années?|ans?)(?=(?:\W|$))/i;

exports.Parser = function FRTimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    result.tags['FRTimeAgoFormatParser'] = true;
    var num = parseInt(match[2]);

    if (isNaN(num)) {
      if (match[2].match(/demi/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[3].match(/heure/) || match[3].match(/minute/)) {
      if (match[3].match(/heure/)) {
        date = date.add(-num, 'hour');
      } else if (match[3].match(/minute/)) {
        date = date.add(-num, 'minute');
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      return result;
    }

    if (match[3].match(/semaine/)) {
      date = date.add(-num, 'week');
      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.imply('weekday', date.day());
      return result;
    }

    if (match[3].match(/jour/)) {
      date = date.add(-num, 'd');
    }

    if (match[3].match(/mois/)) {
      date = date.add(-num, 'month');
    }

    if (match[3].match(/années?|ans?/)) {
      date = date.add(-num, 'year');
    }

    result.start.assign('day', date.date());
    result.start.assign('month', date.month() + 1);
    result.start.assign('year', date.year());
    return result;
  };
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __nested_webpack_require_156324__) {

var dayjs = __nested_webpack_require_156324__(2);

var Parser = __nested_webpack_require_156324__(1).Parser;

var ParsedResult = __nested_webpack_require_156324__(0).ParsedResult;

var ParsedComponents = __nested_webpack_require_156324__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:[àa])\\s*)?" + "(\\d{1,2}(?:h)?|midi|minuit)" + "(?:" + "(?:\\.|\\:|\\：|h)(\\d{1,2})(?:m)?" + "(?:" + "(?:\\:|\\：|m)(\\d{0,2})(?:s)?" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|[àa]|\\?)\\s*" + "(\\d{1,2}(?:h)?)" + "(?:" + "(?:\\.|\\:|\\：|h)(\\d{1,2})(?:m)?" + "(?:" + "(?:\\.|\\:|\\：|m)(\\d{1,2})(?:s)?" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function FRTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['FRTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (match[HOUR_GROUP].toLowerCase() == "midi") {
      meridiem = 1;
      hour = 12;
    } else if (match[HOUR_GROUP].toLowerCase() == "minuit") {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;
        if (hour == 12) hour = 0;
      }

      if (ampm == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      }

      if (ampm == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }

      if (!result.start.isCertain('meridiem')) {
        if (meridiem == 0) {
          result.start.imply('meridiem', 0);

          if (result.start.get('hour') == 12) {
            result.start.assign('hour', 0);
          }
        } else {
          result.start.imply('meridiem', 1);

          if (result.start.get('hour') != 12) {
            result.start.assign('hour', result.start.get('hour') + 12);
          }
        }
      }
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    } else {
      var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == 1;

      if (startAtPM && result.start.get('hour') > hour) {
        // 10pm - 1 (am)
        result.end.imply('meridiem', 0);
      } else if (hour > 12) {
        result.end.imply('meridiem', 1);
      }
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __nested_webpack_require_162293__) {

var Parser = __nested_webpack_require_162293__(1).Parser;

var ParsedResult = __nested_webpack_require_162293__(0).ParsedResult;

var updateParsedComponent = __nested_webpack_require_162293__(6).updateParsedComponent;

var DAYS_OFFSET = {
  'dimanche': 0,
  'dim': 0,
  'lundi': 1,
  'lun': 1,
  'mardi': 2,
  'mar': 2,
  'mercredi': 3,
  'mer': 3,
  'jeudi': 4,
  'jeu': 4,
  'vendredi': 5,
  'ven': 5,
  'samedi': 6,
  'sam': 6
};
var PATTERN = new RegExp('(\\s|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:(ce)\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(dernier|prochain)\\s*)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function FRWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var modifier = null;
    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];

    if (prefix || postfix) {
      var norm = prefix || postfix;
      norm = norm.toLowerCase();

      if (norm == 'dernier') {
        modifier = 'last';
      } else if (norm == 'prochain') {
        modifier = 'next';
      } else if (norm == 'ce') {
        modifier = 'this';
      }
    }

    updateParsedComponent(result, ref, offset, modifier);
    result.tags['FRWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __nested_webpack_require_164134__) {

var quarterOfYear = __nested_webpack_require_164134__(55);

var dayjs = __nested_webpack_require_164134__(2);

dayjs.extend(quarterOfYear);

var Parser = __nested_webpack_require_164134__(1).Parser;

var ParsedResult = __nested_webpack_require_164134__(0).ParsedResult;

var util = __nested_webpack_require_164134__(10);

var PATTERN = new RegExp('(\\W|^)' + '(?:les?|la|l\'|du|des?)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|\\d+)?\\s*' + '(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?)?\\s*' + '(secondes?|min(?:ute)?s?|heures?|jours?|semaines?|mois|trimestres?|années?)\\s*' + '(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?)?' + '(?=\\W|$)', 'i');
var MULTIPLIER_GROUP = 2;
var MODIFIER_1_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;
var MODIFIER_2_GROUP = 5;

exports.Parser = function FRRelativeDateFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length); // Multiplier

    var multiplier = match[MULTIPLIER_GROUP] === undefined ? '1' : match[MULTIPLIER_GROUP];

    if (util.INTEGER_WORDS[multiplier] !== undefined) {
      multiplier = util.INTEGER_WORDS[multiplier];
    } else {
      multiplier = parseInt(multiplier);
    } // Modifier


    var modifier = match[MODIFIER_1_GROUP] === undefined ? match[MODIFIER_2_GROUP] === undefined ? '' : match[MODIFIER_2_GROUP].toLowerCase() : match[MODIFIER_1_GROUP].toLowerCase();

    if (!modifier) {
      // At least one modifier is mandatory to match this parser
      return;
    }

    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    result.tags['FRRelativeDateFormatParser'] = true;
    var modifierFactor;

    switch (true) {
      case /prochaine?s?/.test(modifier):
      case /suivants?/.test(modifier):
        modifierFactor = 1;
        break;

      case /derni[eè]re?s?/.test(modifier):
      case /pass[ée]e?s?/.test(modifier):
      case /pr[ée]c[ée]dents?/.test(modifier):
        modifierFactor = -1;
        break;
    }

    var total = multiplier * modifierFactor;
    var dateFrom = dayjs(ref);
    var dateTo = dayjs(ref);
    var relative = match[RELATIVE_WORD_GROUP];
    var startOf;

    switch (true) {
      case /secondes?/.test(relative):
        dateFrom = dateFrom.add(total, 's');
        dateTo = dateTo.add(modifierFactor, 's');
        startOf = 'second';
        break;

      case /min(?:ute)?s?/.test(relative):
        dateFrom = dateFrom.add(total, 'm');
        dateTo = dateTo.add(modifierFactor, 'm');
        startOf = 'minute';
        break;

      case /heures?/.test(relative):
        dateFrom = dateFrom.add(total, 'h');
        dateTo = dateTo.add(modifierFactor, 'h');
        startOf = 'hour';
        break;

      case /jours?/.test(relative):
        dateFrom = dateFrom.add(total, 'd');
        dateTo = dateTo.add(modifierFactor, 'd');
        startOf = 'day';
        break;

      case /semaines?/.test(relative):
        dateFrom = dateFrom.add(total, 'w');
        dateTo = dateTo.add(modifierFactor, 'w');
        startOf = 'week';
        break;

      case /mois?/.test(relative):
        dateFrom = dateFrom.add(total, 'M');
        dateTo = dateTo.add(modifierFactor, 'M');
        startOf = 'month';
        break;

      case /trimestres?/.test(relative):
        dateFrom = dateFrom.add(total, 'Q');
        dateTo = dateTo.add(modifierFactor, 'Q');
        startOf = 'quarter';
        break;

      case /années?/.test(relative):
        dateFrom = dateFrom.add(total, 'y');
        dateTo = dateTo.add(modifierFactor, 'y');
        startOf = 'year';
        break;
    } // if we go forward, switch the start and end dates


    if (modifierFactor > 0) {
      var dateTmp = dateFrom;
      dateFrom = dateTo;
      dateTo = dateTmp;
    } // Get start and end of dates


    dateFrom = dateFrom.startOf(startOf);
    dateTo = dateTo.endOf(startOf);

    if (startOf == 'week') {
      // Weekday in FR start on Sat?
      dateFrom = dateFrom.add(1, 'd');
      dateTo = dateTo.add(1, 'd');
    } // Assign results


    result.start.assign('year', dateFrom.year());
    result.start.assign('month', dateFrom.month() + 1);
    result.start.assign('day', dateFrom.date());
    result.start.assign('minute', dateFrom.minute());
    result.start.assign('second', dateFrom.second());
    result.start.assign('hour', dateFrom.hour());
    result.start.assign('millisecond', dateFrom.millisecond());
    result.end = result.start.clone();
    result.end.assign('year', dateTo.year());
    result.end.assign('month', dateTo.month() + 1);
    result.end.assign('day', dateTo.date());
    result.end.assign('minute', dateTo.minute());
    result.end.assign('second', dateTo.second());
    result.end.assign('hour', dateTo.hour());
    result.end.assign('millisecond', dateTo.millisecond());
    return result;
  };
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __nccwpck_require__) {

!function(t,n){  true?module.exports=n():0}(this,function(){"use strict";var t="month",n="quarter";return function(r,i){var e=i.prototype;e.quarter=function(t){return this.$utils().u(t)?Math.ceil((this.month()+1)/3):this.month(this.month()%3+3*(t-1))};var u=e.add;e.add=function(r,i){return r=Number(r),this.$utils().p(i)===n?this.add(3*r,t):u.bind(this)(r,i)};var s=e.startOf;e.startOf=function(r,i){var e=this.$utils(),u=!!e.u(i)||i;if(e.p(r)===n){var a=this.quarter()-1;return u?this.month(3*a).startOf(t).startOf("day"):this.month(3*a+2).endOf(t).endOf("day")}return s.bind(this)(r,i)}}});


/***/ }),
/* 56 */
/***/ (function(module, exports, __nested_webpack_require_169913__) {

var dayjs = __nested_webpack_require_169913__(2);

var Parser = __nested_webpack_require_169913__(1).Parser;

var ParsedResult = __nested_webpack_require_169913__(0).ParsedResult;

var util = __nested_webpack_require_169913__(7);

var PATTERN = new RegExp('(\\d{2,4}|[' + Object.keys(util.NUMBER).join('') + ']{2,4})?' + '(?:\\s*)' + '(?:年)?' + '(?:[\\s|,|，]*)' + '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})' + '(?:\\s*)' + '(?:月)' + '(?:\\s*)' + '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})?' + '(?:\\s*)' + '(?:日|號)?');
var YEAR_GROUP = 1;
var MONTH_GROUP = 2;
var DAY_GROUP = 3;

exports.Parser = function ZHHantDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var startMoment = dayjs(ref);
    var result = new ParsedResult({
      text: match[0],
      index: match.index,
      ref: ref
    }); //Month

    var month = parseInt(match[MONTH_GROUP]);
    if (isNaN(month)) month = util.zhStringToNumber(match[MONTH_GROUP]);
    result.start.assign('month', month); //Day

    if (match[DAY_GROUP]) {
      var day = parseInt(match[DAY_GROUP]);
      if (isNaN(day)) day = util.zhStringToNumber(match[DAY_GROUP]);
      result.start.assign('day', day);
    } else {
      result.start.imply('day', startMoment.date());
    } //Year


    if (match[YEAR_GROUP]) {
      var year = parseInt(match[YEAR_GROUP]);
      if (isNaN(year)) year = util.zhStringToYear(match[YEAR_GROUP]);
      result.start.assign('year', year);
    } else {
      result.start.imply('year', startMoment.year());
    }

    result.tags.ZHHantDateParser = true;
    return result;
  };
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __nested_webpack_require_171646__) {

var Parser = __nested_webpack_require_171646__(1).Parser;

var ParsedResult = __nested_webpack_require_171646__(0).ParsedResult;

var updateParsedComponent = __nested_webpack_require_171646__(6).updateParsedComponent;

var util = __nested_webpack_require_171646__(7);

var PATTERN = new RegExp('(上|今|下|這|呢)?' + '(?:個)?' + '(?:星期|禮拜)' + '(' + Object.keys(util.WEEKDAY_OFFSET).join('|') + ')');
var PREFIX_GROUP = 1;
var WEEKDAY_GROUP = 2;

exports.Parser = function ZHHantWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index;
    text = match[0];
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP];
    var offset = util.WEEKDAY_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var modifier = null;
    var prefix = match[PREFIX_GROUP];

    if (prefix == '上') {
      modifier = 'last';
    } else if (prefix == '下') {
      modifier = 'next';
    } else if (prefix == '今' || prefix == '這' || prefix == '呢') {
      modifier = 'this';
    }

    updateParsedComponent(result, ref, offset, modifier);
    result.tags['ZHHantWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __nested_webpack_require_172981__) {

var dayjs = __nested_webpack_require_172981__(2);

var Parser = __nested_webpack_require_172981__(1).Parser;

var ParsedResult = __nested_webpack_require_172981__(0).ParsedResult;

var ParsedComponents = __nested_webpack_require_172981__(0).ParsedComponents;

var util = __nested_webpack_require_172981__(7);

var patternString1 = '(?:由|從|自)?' + '(?:' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|' + '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)' + '(?:[\\s,，]*)' + '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?' + ')?' + '(?:[\\s,，]*)' + '(?:(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)(?:\\s*)(?:點|時|:|：)' + '(?:\\s*)' + '(\\d+|半|正|整|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:分|:|：)?' + '(?:\\s*)' + '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:秒)?)' + '(?:\\s*(A\.M\.|P\.M\.|AM?|PM?))?';
var patternString2 = '(?:^\\s*(?:到|至|\\-|\\–|\\~|\\〜)\\s*)' + '(?:' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|' + '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)' + '(?:[\\s,，]*)' + '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?' + ')?' + '(?:[\\s,，]*)' + '(?:(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)(?:\\s*)(?:點|時|:|：)' + '(?:\\s*)' + '(\\d+|半|正|整|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:分|:|：)?' + '(?:\\s*)' + '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:秒)?)' + '(?:\\s*(A\.M\.|P\.M\.|AM?|PM?))?';
var FIRST_REG_PATTERN = new RegExp(patternString1, 'i');
var SECOND_REG_PATTERN = new RegExp(patternString2, 'i');
var DAY_GROUP_1 = 1;
var ZH_AM_PM_HOUR_GROUP_1 = 2;
var ZH_AM_PM_HOUR_GROUP_2 = 3;
var DAY_GROUP_3 = 4;
var ZH_AM_PM_HOUR_GROUP_3 = 5;
var HOUR_GROUP = 6;
var MINUTE_GROUP = 7;
var SECOND_GROUP = 8;
var AM_PM_HOUR_GROUP = 9;

exports.Parser = function ZHHantTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index;
    result.text = match[0];
    result.tags.ZHTimeExpressionParser = true;
    var startMoment = refMoment.clone(); // ----- Day

    if (match[DAY_GROUP_1]) {
      var day1 = match[DAY_GROUP_1];

      if (day1 == '明' || day1 == '聽') {
        // Check not "Tomorrow" on late night
        if (refMoment.hour() > 1) {
          startMoment.add(1, 'day');
        }
      } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
        startMoment.add(-1, 'day');
      } else if (day1 == "前") {
        startMoment.add(-2, 'day');
      } else if (day1 == "大前") {
        startMoment.add(-3, 'day');
      } else if (day1 == "後") {
        startMoment.add(2, 'day');
      } else if (day1 == "大後") {
        startMoment.add(3, 'day');
      }

      result.start.assign('day', startMoment.date());
      result.start.assign('month', startMoment.month() + 1);
      result.start.assign('year', startMoment.year());
    } else if (match[DAY_GROUP_3]) {
      var day3 = match[DAY_GROUP_3];

      if (day3 == '明' || day3 == '聽') {
        startMoment.add(1, 'day');
      } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
        startMoment.add(-1, 'day');
      } else if (day3 == "前") {
        startMoment.add(-2, 'day');
      } else if (day3 == "大前") {
        startMoment.add(-3, 'day');
      } else if (day3 == "後") {
        startMoment.add(2, 'day');
      } else if (day3 == "大後") {
        startMoment.add(3, 'day');
      }

      result.start.assign('day', startMoment.date());
      result.start.assign('month', startMoment.month() + 1);
      result.start.assign('year', startMoment.year());
    } else {
      result.start.imply('day', startMoment.date());
      result.start.imply('month', startMoment.month() + 1);
      result.start.imply('year', startMoment.year());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP]) {
      var second = parseInt(match[SECOND_GROUP]);

      if (isNaN(second)) {
        second = util.zhStringToNumber(match[SECOND_GROUP]);
      }

      if (second >= 60) return null;
      result.start.assign('second', second);
    }

    hour = parseInt(match[HOUR_GROUP]);

    if (isNaN(hour)) {
      hour = util.zhStringToNumber(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP]) {
      if (match[MINUTE_GROUP] == '半') {
        minute = 30;
      } else if (match[MINUTE_GROUP] == '正' || match[MINUTE_GROUP] == '整') {
        minute = 0;
      } else {
        minute = parseInt(match[MINUTE_GROUP]);

        if (isNaN(minute)) {
          minute = util.zhStringToNumber(match[MINUTE_GROUP]);
        }
      }
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP]) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;
        if (hour == 12) hour = 0;
      }

      if (ampm == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
      var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
      var zhAMPM1 = zhAMPMString1[0];

      if (zhAMPM1 == '朝' || zhAMPM1 == '早') {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else if (zhAMPM1 == '晚') {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
      var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
      var zhAMPM2 = zhAMPMString2[0];

      if (zhAMPM2 == '上' || zhAMPM2 == '朝' || zhAMPM2 == '早' || zhAMPM2 == '凌') {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else if (zhAMPM2 == '下' || zhAMPM2 == '晏' || zhAMPM2 == '晚') {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
      var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
      var zhAMPM3 = zhAMPMString3[0];

      if (zhAMPM3 == '上' || zhAMPM3 == '朝' || zhAMPM3 == '早' || zhAMPM3 == '凌') {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else if (zhAMPM3 == '下' || zhAMPM3 == '晏' || zhAMPM3 == '晚') {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } else {
      if (hour < 12) {
        result.start.imply('meridiem', 0);
      } else {
        result.start.imply('meridiem', 1);
      }
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    }

    var endMoment = startMoment.clone();
    result.end = new ParsedComponents(null, null); // ----- Day

    if (match[DAY_GROUP_1]) {
      var day1 = match[DAY_GROUP_1];

      if (day1 == '明' || day1 == '聽') {
        // Check not "Tomorrow" on late night
        if (refMoment.hour() > 1) {
          endMoment.add(1, 'day');
        }
      } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
        endMoment.add(-1, 'day');
      } else if (day1 == "前") {
        endMoment.add(-2, 'day');
      } else if (day1 == "大前") {
        endMoment.add(-3, 'day');
      } else if (day1 == "後") {
        endMoment.add(2, 'day');
      } else if (day1 == "大後") {
        endMoment.add(3, 'day');
      }

      result.end.assign('day', endMoment.date());
      result.end.assign('month', endMoment.month() + 1);
      result.end.assign('year', endMoment.year());
    } else if (match[DAY_GROUP_3]) {
      var day3 = match[DAY_GROUP_3];

      if (day3 == '明' || day3 == '聽') {
        endMoment.add(1, 'day');
      } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
        endMoment.add(-1, 'day');
      } else if (day3 == "前") {
        endMoment.add(-2, 'day');
      } else if (day3 == "大前") {
        endMoment.add(-3, 'day');
      } else if (day3 == "後") {
        endMoment.add(2, 'day');
      } else if (day3 == "大後") {
        endMoment.add(3, 'day');
      }

      result.end.assign('day', endMoment.date());
      result.end.assign('month', endMoment.month() + 1);
      result.end.assign('year', endMoment.year());
    } else {
      result.end.imply('day', endMoment.date());
      result.end.imply('month', endMoment.month() + 1);
      result.end.imply('year', endMoment.year());
    }

    hour = 0;
    minute = 0;
    meridiem = -1; // ----- Second

    if (match[SECOND_GROUP]) {
      var second = parseInt(match[SECOND_GROUP]);

      if (isNaN(second)) {
        second = util.zhStringToNumber(match[SECOND_GROUP]);
      }

      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[HOUR_GROUP]);

    if (isNaN(hour)) {
      hour = util.zhStringToNumber(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP]) {
      if (match[MINUTE_GROUP] == '半') {
        minute = 30;
      } else if (match[MINUTE_GROUP] == '正' || match[MINUTE_GROUP] == '整') {
        minute = 0;
      } else {
        minute = parseInt(match[MINUTE_GROUP]);

        if (isNaN(minute)) {
          minute = util.zhStringToNumber(match[MINUTE_GROUP]);
        }
      }
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP]) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;
        if (hour == 12) hour = 0;
      }

      if (ampm == "p") {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }

      if (!result.start.isCertain('meridiem')) {
        if (meridiem == 0) {
          result.start.imply('meridiem', 0);

          if (result.start.get('hour') == 12) {
            result.start.assign('hour', 0);
          }
        } else {
          result.start.imply('meridiem', 1);

          if (result.start.get('hour') != 12) {
            result.start.assign('hour', result.start.get('hour') + 12);
          }
        }
      }
    } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
      var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
      var zhAMPM1 = zhAMPMString1[0];

      if (zhAMPM1 == '朝' || zhAMPM1 == '早') {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else if (zhAMPM1 == '晚') {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
      var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
      var zhAMPM2 = zhAMPMString2[0];

      if (zhAMPM2 == '上' || zhAMPM2 == '朝' || zhAMPM2 == '早' || zhAMPM2 == '凌') {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else if (zhAMPM2 == '下' || zhAMPM2 == '晏' || zhAMPM2 == '晚') {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
      var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
      var zhAMPM3 = zhAMPMString3[0];

      if (zhAMPM3 == '上' || zhAMPM3 == '朝' || zhAMPM3 == '早' || zhAMPM3 == '凌') {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else if (zhAMPM3 == '下' || zhAMPM3 == '晏' || zhAMPM3 == '晚') {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    } else {
      var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == 1;

      if (startAtPM && result.start.get('hour') > hour) {
        // 10pm - 1 (am)
        result.end.imply('meridiem', 0);
      } else if (hour > 12) {
        result.end.imply('meridiem', 1);
      }
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __nested_webpack_require_185922__) {

var dayjs = __nested_webpack_require_185922__(2);

var Parser = __nested_webpack_require_185922__(1).Parser;

var ParsedResult = __nested_webpack_require_185922__(0).ParsedResult;

var PATTERN = new RegExp('(而家|立(?:刻|即)|即刻)|' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|' + '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)' + '(?:[\\s|,|，]*)' + '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?', 'i');
var NOW_GROUP = 1;
var DAY_GROUP_1 = 2;
var TIME_GROUP_1 = 3;
var TIME_GROUP_2 = 4;
var DAY_GROUP_3 = 5;
var TIME_GROUP_3 = 6;

exports.Parser = function ZHHantCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    text = match[0];
    var index = match.index;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;

    if (match[NOW_GROUP]) {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    } else if (match[DAY_GROUP_1]) {
      var day1 = match[DAY_GROUP_1];
      var time1 = match[TIME_GROUP_1];

      if (day1 == '明' || day1 == '聽') {
        // Check not "Tomorrow" on late night
        if (refMoment.hour() > 1) {
          startMoment = startMoment.add(1, 'day');
        }
      } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
        startMoment = startMoment.add(-1, 'day');
      } else if (day1 == "前") {
        startMoment = startMoment.add(-2, 'day');
      } else if (day1 == "大前") {
        startMoment = startMoment.add(-3, 'day');
      } else if (day1 == "後") {
        startMoment = startMoment.add(2, 'day');
      } else if (day1 == "大後") {
        startMoment = startMoment.add(3, 'day');
      }

      if (time1 == '早' || time1 == '朝') {
        result.start.imply('hour', 6);
      } else if (time1 == '晚') {
        result.start.imply('hour', 22);
        result.start.imply('meridiem', 1);
      }
    } else if (match[TIME_GROUP_2]) {
      var timeString2 = match[TIME_GROUP_2];
      var time2 = timeString2[0];

      if (time2 == '早' || time2 == '朝' || time2 == '上') {
        result.start.imply('hour', 6);
      } else if (time2 == '下' || time2 == '晏') {
        result.start.imply('hour', 15);
        result.start.imply('meridiem', 1);
      } else if (time2 == '中') {
        result.start.imply('hour', 12);
        result.start.imply('meridiem', 1);
      } else if (time2 == '夜' || time2 == '晚') {
        result.start.imply('hour', 22);
        result.start.imply('meridiem', 1);
      } else if (time2 == '凌') {
        result.start.imply('hour', 0);
      }
    } else if (match[DAY_GROUP_3]) {
      var day3 = match[DAY_GROUP_3];

      if (day3 == '明' || day3 == '聽') {
        // Check not "Tomorrow" on late night
        if (refMoment.hour() > 1) {
          startMoment = startMoment.add(1, 'day');
        }
      } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
        startMoment = startMoment.add(-1, 'day');
      } else if (day3 == "前") {
        startMoment = startMoment.add(-2, 'day');
      } else if (day3 == "大前") {
        startMoment = startMoment.add(-3, 'day');
      } else if (day3 == "後") {
        startMoment = startMoment.add(2, 'day');
      } else if (day3 == "大後") {
        startMoment = startMoment.add(3, 'day');
      }

      var timeString3 = match[TIME_GROUP_3];

      if (timeString3) {
        var time3 = timeString3[0];

        if (time3 == '早' || time3 == '朝' || time3 == '上') {
          result.start.imply('hour', 6);
        } else if (time3 == '下' || time3 == '晏') {
          result.start.imply('hour', 15);
          result.start.imply('meridiem', 1);
        } else if (time3 == '中') {
          result.start.imply('hour', 12);
          result.start.imply('meridiem', 1);
        } else if (time3 == '夜' || time3 == '晚') {
          result.start.imply('hour', 22);
          result.start.imply('meridiem', 1);
        } else if (time3 == '凌') {
          result.start.imply('hour', 0);
        }
      }
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags.ZHHantCasualDateParser = true;
    return result;
  };
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __nested_webpack_require_190508__) {

var dayjs = __nested_webpack_require_190508__(2);

var Parser = __nested_webpack_require_190508__(1).Parser;

var ParsedResult = __nested_webpack_require_190508__(0).ParsedResult;

var util = __nested_webpack_require_190508__(7);

var PATTERN = new RegExp('(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+|半|幾)(?:\\s*)' + '(?:個)?' + '(秒(?:鐘)?|分鐘|小時|鐘|日|天|星期|禮拜|月|年)' + '(?:(?:之|過)?後|(?:之)?內)', 'i');
var NUMBER_GROUP = 1;
var UNIT_GROUP = 2;

exports.Parser = function ZHHantCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index;
    text = match[0];
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var number = parseInt(match[NUMBER_GROUP]);

    if (isNaN(number)) {
      number = util.zhStringToNumber(match[NUMBER_GROUP]);
    }

    if (isNaN(number)) {
      var string = match[NUMBER_GROUP];

      if (string === '幾') {
        number = 3;
      } else if (string === '半') {
        number = 0.5;
      } else {
        //just in case
        return null;
      }
    }

    var date = dayjs(ref);
    var unit = match[UNIT_GROUP];
    var unitAbbr = unit[0];

    if (unitAbbr.match(/[日天星禮月年]/)) {
      if (unitAbbr == '日' || unitAbbr == '天') {
        date = date.add(number, 'd');
      } else if (unitAbbr == '星' || unitAbbr == '禮') {
        date = date.add(number * 7, 'd');
      } else if (unitAbbr == '月') {
        date = date.add(number, 'month');
      } else if (unitAbbr == '年') {
        date = date.add(number, 'year');
      }

      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (unitAbbr == '秒') {
      date = date.add(number, 'second');
    } else if (unitAbbr == '分') {
      date = date.add(number, 'minute');
    } else if (unitAbbr == '小' || unitAbbr == '鐘') {
      date = date.add(number, 'hour');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.start.assign('second', date.second());
    result.tags.ZHHantDeadlineFormatParser = true;
    return result;
  };
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __nested_webpack_require_192960__) {

/*


*/
var dayjs = __nested_webpack_require_192960__(2);

var Parser = __nested_webpack_require_192960__(1).Parser;

var ParsedResult = __nested_webpack_require_192960__(0).ParsedResult;

var util = __nested_webpack_require_192960__(8);

var PATTERN = new RegExp('(\\W|^)' + '(in|nach)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|einigen|eine[rm]\\s*halben|eine[rm])\\s*' + '(sekunden?|min(?:ute)?n?|stunden?|tag(?:en)?|wochen?|monat(?:en)?|jahr(?:en)?)\\s*' + '(?=\\W|$)', 'i');
var STRICT_PATTERN = new RegExp('(\\W|^)' + '(in|nach)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|eine(?:r|m)?)\\s*' + '(sekunden?|minuten?|stunden?|tag(?:en)?)\\s*' + '(?=\\W|$)', 'i');

exports.Parser = function DEDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = match[3].toLowerCase();

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === 'einer' || num === 'einem') {
      num = 1;
    } else if (num === 'einigen') {
      num = 3;
    } else if (/halben/.test(num)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    var date = dayjs(ref);

    if (/tag|woche|monat|jahr/i.test(match[4])) {
      if (/tag/i.test(match[4])) {
        date = date.add(num, 'd');
      } else if (/woche/i.test(match[4])) {
        date = date.add(num * 7, 'd');
      } else if (/monat/i.test(match[4])) {
        date = date.add(num, 'month');
      } else if (/jahr/i.test(match[4])) {
        date = date.add(num, 'year');
      }

      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (/stunde/i.test(match[4])) {
      date = date.add(num, 'hour');
    } else if (/min/i.test(match[4])) {
      date = date.add(num, 'minute');
    } else if (/sekunde/i.test(match[4])) {
      date = date.add(num, 'second');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.start.assign('second', date.second());
    result.tags['DEDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __nested_webpack_require_195677__) {

var dayjs = __nested_webpack_require_195677__(2);

var parser = __nested_webpack_require_195677__(1);

var ParsedResult = __nested_webpack_require_195677__(0).ParsedResult;

var util = __nested_webpack_require_195677__(8);

var PATTERN = new RegExp('(\\W|^)' + '(?:am\\s*?)?' + '(?:(Sonntag|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|So|Mo|Di|Mi|Do|Fr|Sa)\\s*,?\\s*)?' + '(?:den\\s*)?' + '([0-9]{1,2})\\.' + '(?:\\s*(?:bis(?:\\s*(?:am|zum))?|\\-|\\–|\\s)\\s*([0-9]{1,2})\\.)?\\s*' + '(Jan(?:uar|\\.)?|Feb(?:ruar|\\.)?|Mär(?:z|\\.)?|Maerz|Mrz\\.?|Apr(?:il|\\.)?|Mai|Jun(?:i|\\.)?|Jul(?:i|\\.)?|Aug(?:ust|\\.)?|Sep(?:t|t\\.|tember|\\.)?|Okt(?:ober|\\.)?|Nov(?:ember|\\.)?|Dez(?:ember|\\.)?)' + '(?:' + ',?\\s*([0-9]{1,4}(?![^\\s]\\d))' + '(\\s*[vn]\\.?\\s*C(?:hr)?\\.?)?' + ')?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function DEMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (/v/i.test(match[YEAR_BE_GROUP])) {
          // v.Chr.
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 January 2012'


    if (match[DATE_TO_GROUP]) {
      result.end = result.start.clone();
      result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
    }

    result.tags['DEMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __nested_webpack_require_198348__) {

/*
    
    The parser for parsing month name and year.
    
    EX. 
        - Januar
        - Januar 2012
*/
var parser = __nested_webpack_require_198348__(1);

var ParsedResult = __nested_webpack_require_198348__(0).ParsedResult;

var util = __nested_webpack_require_198348__(8);

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' + '(Jan\\.?|Januar|Feb\\.?|Februar|Mär\\.?|M(?:ä|ae)rz|Mrz\\.?|Apr\\.?|April|Mai\\.?|Jun\\.?|Juni|Jul\\.?|Juli|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Okt\\.?|Oktober|Nov\\.?|November|Dez\\.?|Dezember)' + '\\s*' + '(?:' + ',?\\s*(?:([0-9]{4})(\\s*[vn]\\.?\\s*C(?:hr)?\\.?)?|([0-9]{1,4})\\s*([vn]\\.?\\s*C(?:hr)?\\.?))' + ')?' + '(?=[^\\s\\w]|$)', 'i');
var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;
var YEAR_GROUP2 = 5;
var YEAR_BE_GROUP2 = 6;

exports.Parser = function ENMonthNameParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = 1;
    var year = null;

    if (match[YEAR_GROUP] || match[YEAR_GROUP2]) {
      year = match[YEAR_GROUP] || match[YEAR_GROUP2];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2]) {
        if (/v/i.test(match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2])) {
          // v.Chr.
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    }

    if (this.isStrictMode() && result.text.match(/^\w+$/)) {
      return false;
    }

    result.tags['DEMonthNameParser'] = true;
    return result;
  };
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __nested_webpack_require_200593__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Tuesday 11/3/2015
    - 11/3/2015
    - 11/3
*/
var dayjs = __nested_webpack_require_200593__(2);

var Parser = __nested_webpack_require_200593__(1).Parser;

var ParsedResult = __nested_webpack_require_200593__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:am\\s*?)?' + '((?:sonntag|so|montag|mo|dienstag|di|mittwoch|mi|donnerstag|do|freitag|fr|samstag|sa))' + '\\s*\\,?\\s*' + '(?:den\\s*)?' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'sonntag': 0,
  'so': 0,
  'montag': 1,
  'mo': 1,
  'dienstag': 2,
  'di': 2,
  'mittwoch': 3,
  'mi': 3,
  'donnerstag': 4,
  'do': 4,
  'freitag': 5,
  'fr': 5,
  'samstag': 6,
  'sa': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;
var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function DESlashDateFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year); //Day of week

    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['DESlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __nested_webpack_require_203270__) {

var dayjs = __nested_webpack_require_203270__(2);

var Parser = __nested_webpack_require_203270__(1).Parser;

var ParsedResult = __nested_webpack_require_203270__(0).ParsedResult;

var util = __nested_webpack_require_203270__(8);

var PATTERN = new RegExp('' + '(\\W|^)vor\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|einigen|eine[rm]\\s*halben|eine[rm])\\s*' + '(sekunden?|min(?:ute)?n?|stunden?|wochen?|tag(?:en)?|monat(?:en)?|jahr(?:en)?)\\s*' + '(?=(?:\\W|$))', 'i');
var STRICT_PATTERN = new RegExp('' + '(\\W|^)vor\\s*' + '([0-9]+|eine(?:r|m))\\s*' + '(sekunden?|minuten?|stunden?|tag(?:en)?)' + '(?=(?:\\W|$))', 'i');

exports.Parser = function DETimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = match[2].toLowerCase();

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === 'einer' || num === 'einem') {
      num = 1;
    } else if (num === 'einigen') {
      num = 3;
    } else if (/halben/.test(num)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    var date = dayjs(ref);

    if (/stunde|min|sekunde/i.test(match[3])) {
      if (/stunde/i.test(match[3])) {
        date = date.add(-num, 'hour');
      } else if (/min/i.test(match[3])) {
        date = date.add(-num, 'minute');
      } else if (/sekunde/i.test(match[3])) {
        date = date.add(-num, 'second');
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.start.assign('second', date.second());
      result.tags['DETimeAgoFormatParser'] = true;
      return result;
    }

    if (/woche/i.test(match[3])) {
      date = date.add(-num, 'week');
      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.imply('weekday', date.day());
      return result;
    }

    if (/tag/i.test(match[3])) {
      date = date.add(-num, 'd');
    }

    if (/monat/i.test(match[3])) {
      date = date.add(-num, 'month');
    }

    if (/jahr/i.test(match[3])) {
      date = date.add(-num, 'year');
    }

    result.start.assign('day', date.date());
    result.start.assign('month', date.month() + 1);
    result.start.assign('year', date.year());
    return result;
  };
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __nested_webpack_require_206232__) {

/*


*/
var dayjs = __nested_webpack_require_206232__(2);

var Parser = __nested_webpack_require_206232__(1).Parser;

var ParsedResult = __nested_webpack_require_206232__(0).ParsedResult;

var ParsedComponents = __nested_webpack_require_206232__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:um|von)\\s*)?" + "(\\d{1,4}|mittags?|mitternachts?)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})" + ")?" + ")?" + "(?:\\s*uhr)?" + "(?:\\s*(morgens|vormittags|mittags|nachmittags|abends|nachts))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|bis|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + ")?" + ")?" + "(?:\\s*(morgens|vormittags|mittags|nachmittags|abends|nachts))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function DETimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['DETimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (/mittags?/i.test(match[HOUR_GROUP])) {
      meridiem = 1;
      hour = 12;
    } else if (/mitternachts?/i.test(match[HOUR_GROUP])) {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP].toLowerCase();

      if (ampm === 'morgens' || ampm === 'vormittags') {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } else {
      if (hour < 12) {
        result.start.imply('meridiem', 0);
      } else {
        result.start.imply('meridiem', 1);
      }
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP].toLowerCase();

      if (ampm === 'morgens' || ampm === 'vormittags') {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      } else {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }

      if (!result.start.isCertain('meridiem')) {
        if (meridiem == 0) {
          result.start.imply('meridiem', 0);

          if (result.start.get('hour') == 12) {
            result.start.assign('hour', 0);
          }
        } else {
          result.start.imply('meridiem', 1);

          if (result.start.get('hour') != 12) {
            result.start.assign('hour', result.start.get('hour') + 12);
          }
        }
      }
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    } else {
      var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == 1;

      if (startAtPM && result.start.get('hour') > hour) {
        // 10pm - 1 (am)
        result.end.imply('meridiem', 0);
      } else if (hour > 12) {
        result.end.imply('meridiem', 1);
      }
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __nested_webpack_require_212402__) {

/*


*/
var dayjs = __nested_webpack_require_212402__(2);

var Parser = __nested_webpack_require_212402__(1).Parser;

var ParsedResult = __nested_webpack_require_212402__(0).ParsedResult;

var DAYS_OFFSET = {
  'sonntag': 0,
  'so': 0,
  'montag': 1,
  'mo': 1,
  'dienstag': 2,
  'di': 2,
  'mittwoch': 3,
  'mi': 3,
  'donnerstag': 4,
  'do': 4,
  'freitag': 5,
  'fr': 5,
  'samstag': 6,
  'sa': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:a[mn]\\s*?)?' + '(?:(diese[mn]|letzte[mn]|n(?:ä|ae)chste[mn])\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(diese|letzte|n(?:ä|ae)chste)\\s*woche)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function DEWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var startMoment = dayjs(ref);
    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];
    var refOffset = startMoment.day();
    var norm = prefix || postfix;
    norm = norm || '';
    norm = norm.toLowerCase();

    if (/letzte/.test(norm)) {
      startMoment = startMoment.day(offset - 7);
    } else if (/n(?:ä|ae)chste/.test(norm)) {
      startMoment = startMoment.day(offset + 7);
    } else if (/diese/.test(norm)) {
      if (opt.forwardDate && refOffset > offset) {
        startMoment = startMoment.day(offset + 7);
      } else {
        startMoment = startMoment.day(offset);
      }
    } else {
      if (opt.forwardDate && refOffset > offset) {
        startMoment = startMoment.day(offset + 7);
      } else if (!opt.forwardDate && Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
        startMoment = startMoment.day(offset - 7);
      } else if (!opt.forwardDate && Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
        startMoment = startMoment.day(offset + 7);
      } else {
        startMoment = startMoment.day(offset);
      }
    }

    result.start.assign('weekday', offset);
    result.start.imply('day', startMoment.date());
    result.start.imply('month', startMoment.month() + 1);
    result.start.imply('year', startMoment.year());
    return result;
  };
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __nested_webpack_require_215115__) {

var dayjs = __nested_webpack_require_215115__(2);

var Parser = __nested_webpack_require_215115__(1).Parser;

var ParsedResult = __nested_webpack_require_215115__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)(' + 'jetzt|' + '(?:heute|diesen)\\s*(morgen|vormittag|mittag|nachmittag|abend)|' + '(?:heute|diese)\\s*nacht|' + 'heute|' + '(?:(?:ü|ue)ber)?morgen(?:\\s*(morgen|vormittag|mittag|nachmittag|abend|nacht))?|' + '(?:vor)?gestern(?:\\s*(morgen|vormittag|mittag|nachmittag|abend|nacht))?|' + 'letzte\\s*nacht' + ')(?=\\W|$)', 'i');

exports.Parser = function DECasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var lowerText = text.toLowerCase();
    var startMoment = refMoment;

    if (/(?:heute|diese)\s*nacht/.test(lowerText)) {
      // Normally means this coming midnight
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (/^(?:ü|ue)bermorgen/.test(lowerText)) {
      startMoment = startMoment.add(refMoment.hour() > 1 ? 2 : 1, 'day');
    } else if (/^morgen/.test(lowerText)) {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (/^gestern/.test(lowerText)) {
      startMoment = startMoment.add(-1, 'day');
    } else if (/^vorgestern/.test(lowerText)) {
      startMoment = startMoment.add(-2, 'day');
    } else if (/letzte\s*nacht/.test(lowerText)) {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText === 'jetzt') {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    var secondMatch = match[3] || match[4] || match[5];

    if (secondMatch) {
      switch (secondMatch.toLowerCase()) {
        case 'morgen':
          result.start.imply('hour', 6);
          break;

        case 'vormittag':
          result.start.imply('hour', 9);
          break;

        case 'mittag':
          result.start.imply('hour', 12);
          break;

        case 'nachmittag':
          result.start.imply('hour', 15);
          result.start.imply('meridiem', 1);
          break;

        case 'abend':
          result.start.imply('hour', 18);
          result.start.imply('meridiem', 1);
          break;

        case 'nacht':
          result.start.imply('hour', 0);
          break;
      }
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['DECasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __nested_webpack_require_218276__) {

/*

    The parser for parsing month name and year.

    EX.
        - januari
        - januari 2012
        - januari, 2012
*/
var parser = __nested_webpack_require_218276__(1);

var ParsedResult = __nested_webpack_require_218276__(0).ParsedResult;

var util = __nested_webpack_require_218276__(11);

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' + '(' + util.MONTH_PATTERN + ')' + '\\s*' + '(?:' + '[,-]?\\s*([0-9]{4})(\\s*BE|n\.Chr\.|v\.Chr\.)?' + ')?' + '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');
var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;

exports.Parser = function ENMonthNameParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var day = 1;
    var monthName = match[MONTH_NAME_GROUP];
    var month = util.MONTH_OFFSET[monthName.toLowerCase()];
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (match[YEAR_BE_GROUP].match(/BE/)) {
          // Buddhist Era
          year = year - 543;
        } else if (match[YEAR_BE_GROUP].match(/v\.Chr\./)) {
          // Before Christ
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    }

    if (result.text.match(/^\w{3}$/)) {
      return false;
    }

    result.tags['NLMonthNameParser'] = true;
    return result;
  };
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __nested_webpack_require_220312__) {

var parser = __nested_webpack_require_220312__(1);

var ParsedResult = __nested_webpack_require_220312__(0).ParsedResult;

var util = __nested_webpack_require_220312__(11);

var PATTERN = new RegExp('(\\W|^)' + '(?:op\\s*?)?' + '(?:' + '(' + util.WEEKDAY_PATTERN + ')' + '\\s*,?\\s*)?' + '([0-9]{1,2})\.?' + '(?:\\s*(?:tot|\\-|\\–|tot en met|t\\/m)\\s*([0-9]{1,2})\.?)?\\s*' + '(' + util.MONTH_PATTERN + ')' + '(?:' + '(?:-|\/|,?\\s*)' + '((?:' + '[1-9][0-9]{0,3}\\s*(?:BE|n\.Chr\.|v\.Chr\.)|' + '[1-2][0-9]{3}|' + '[5-9][0-9]' + ')(?![^\\s]\\d))' + ')?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;

exports.Parser = function ENMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];

      if (/BE/i.test(year)) {
        // Buddhist Era
        year = year.replace(/BE/i, '');
        year = parseInt(year) - 543;
      } else if (/v\.Chr\./i.test(year)) {
        // Before Christ
        year = year.replace(/v\.Chr\./i, '');
        year = -parseInt(year);
      } else if (/n\.Chr\./i.test(year)) {
        year = year.replace(/n\.Chr\./i, '');
        year = parseInt(year);
      } else {
        year = parseInt(year);

        if (year < 100) {
          if (year > 50) {
            year = year + 1900;
          } else {
            year = year + 2000;
          }
        }
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 januari 2012'


    if (match[DATE_TO_GROUP]) {
      var endDate = parseInt(match[DATE_TO_GROUP]);
      result.end = result.start.clone();
      result.end.assign('day', endDate);
    }

    result.tags['NLMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __nested_webpack_require_223151__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - dinsdag 11/3/2015
    - 11/3/2015
    - 11/3
    - dinsdag 11.mrt.15
*/
var dayjs = __nested_webpack_require_223151__(2);

var Parser = __nested_webpack_require_223151__(1).Parser;

var ParsedResult = __nested_webpack_require_223151__(0).ParsedResult;

var util = __nested_webpack_require_223151__(11);

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:op\\s*?)?' + '(' + util.WEEKDAY_PATTERN + ')' + '\\s*\\,?\\s*' + '(?:de\\s*)?' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-1]{0,1}[0-9]{1}|' + util.MONTH_PATTERN + ')' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;
var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function DESlashDateFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);

    if (!month) {
      month = util.MONTH_OFFSET[match[MONTH_GROUP].trim().toLowerCase()];
    }

    day = parseInt(day);
    year = parseInt(year);
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year); //Day of week

    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', util.WEEKDAY_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['NLSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __nested_webpack_require_225752__) {

var dayjs = __nested_webpack_require_225752__(2);

var Parser = __nested_webpack_require_225752__(1).Parser;

var ParsedResult = __nested_webpack_require_225752__(0).ParsedResult;

var DAYS_OFFSET = {
  'zondag': 0,
  'zo': 0,
  'maandag': 1,
  'ma': 1,
  'dinsdag': 2,
  'di': 2,
  'woensdag': 3,
  'wo': 3,
  'donderdag': 4,
  'do': 4,
  'vrijdag': 5,
  'vr': 5,
  'zaterdag': 6,
  'za': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:on\\s*?)?' + '(?:(deze|afgelopen|vorige|volgende|komende)\\s*(?:week)?\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(deze|afgelopen|vorige|volgende|komende)\\s*week)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.updateParsedComponent = function updateParsedComponent(result, ref, offset, modifier) {
  var startMoment = dayjs(ref);
  var startMomentFixed = false;
  var refOffset = startMoment.day();

  if (modifier == 'afgelopen' || modifier == 'vorige') {
    startMoment = startMoment.day(offset - 7);
    startMomentFixed = true;
  } else if (modifier == 'volgende') {
    startMoment = startMoment.day(offset + 7);
    startMomentFixed = true;
  } else if (modifier == 'deze' || modifier == 'komende') {
    startMoment = startMoment.day(offset);
  } else {
    if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
      startMoment = startMoment.day(offset - 7);
    } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
      startMoment = startMoment.day(offset + 7);
    } else {
      startMoment = startMoment.day(offset);
    }
  }

  result.start.assign('weekday', offset);

  if (startMomentFixed) {
    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
  } else {
    result.start.imply('day', startMoment.date());
    result.start.imply('month', startMoment.month() + 1);
    result.start.imply('year', startMoment.year());
  }

  return result;
};

exports.Parser = function NLWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];

    if (offset === undefined) {
      return null;
    }

    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];
    var norm = prefix || postfix;
    norm = norm || '';
    norm = norm.toLowerCase();
    exports.updateParsedComponent(result, ref, offset, norm);
    result.tags['NLWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __nested_webpack_require_228746__) {

/*


*/
var dayjs = __nested_webpack_require_228746__(2);

var Parser = __nested_webpack_require_228746__(1).Parser;

var ParsedResult = __nested_webpack_require_228746__(0).ParsedResult;

var ParsedComponents = __nested_webpack_require_228746__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:om|van)\\s*)?" + "(\\d{1,4}|tussen de middag|middernachts?)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})" + ")?" + ")?" + "(?:\\s*uur)?" + "(?:\\s*(\'s morgens|\'s ochtends|in de ochtend|\'s middags|in de middag|\'s avonds|in de avond|\'s nachts))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|tot|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + ")?" + ")?" + "(?:\\s*(\'s morgens|\'s ochtends|in de ochtend|\'s middags|in de middag|\'s avonds|in de avond|\'s nachts))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function NLTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['NLTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (/tussen de middag/i.test(match[HOUR_GROUP])) {
      meridiem = 1;
      hour = 12;
    } else if (/middernachts?/i.test(match[HOUR_GROUP])) {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP].toLowerCase();

      if (ampm === "'s ochtends" || ampm === 'in de ochtend' || ampm === "'s morgens") {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } else {
      if (hour < 12) {
        result.start.imply('meridiem', 0);
      } else {
        result.start.imply('meridiem', 1);
      }
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
    } else if (hour > 100) {
      minute = hour % 100;
      hour = parseInt(hour / 100);
    }

    if (minute >= 60) {
      return null;
    }

    if (hour > 24) {
      return null;
    }

    if (hour >= 12) {
      meridiem = 1;
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP].toLowerCase();

      if (ampm === '\'s ochtends' || ampm === 'in de ochtend' || ampm === '\'s morgens') {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      } else {
        meridiem = 1;
        if (hour != 12) hour += 12;
      }

      if (!result.start.isCertain('meridiem')) {
        if (meridiem == 0) {
          result.start.imply('meridiem', 0);

          if (result.start.get('hour') == 12) {
            result.start.assign('hour', 0);
          }
        } else {
          result.start.imply('meridiem', 1);

          if (result.start.get('hour') != 12) {
            result.start.assign('hour', result.start.get('hour') + 12);
          }
        }
      }
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    } else {
      var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == 1;

      if (startAtPM && result.start.get('hour') > hour) {
        // 10pm - 1 (am)
        result.end.imply('meridiem', 0);
      } else if (hour > 12) {
        result.end.imply('meridiem', 1);
      }
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __nested_webpack_require_235088__) {

var dayjs = __nested_webpack_require_235088__(2);

var Parser = __nested_webpack_require_235088__(1).Parser;

var ParsedResult = __nested_webpack_require_235088__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)(' + 'nu|' + 'vroeg in de ochtend|' + '(?:van|deze)\\s*(morgen|ochtend|middag|avond)|' + '\'s morgens|\'s ochtends|tussen de middag|\'s middags|\'s avonds|' + '(?:deze|van)\\s*nacht|' + 'vandaag|' + '(?:over)?morgen(?:\\s*(ochtend|middag|avond|nacht))?|' + '(?:eer)?gister(?:\\s*(ochtend|middag|avond|nacht))?|' + 'afgelopen\\s*nacht' + ')(?=\\W|$)', 'i');

exports.Parser = function DECasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var lowerText = text.toLowerCase();
    var startMoment = refMoment;

    if (/(?:van|deze)\s*nacht/.test(lowerText)) {
      // Normally means this coming midnight
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (/^overmorgen/.test(lowerText)) {
      startMoment = startMoment.add(refMoment.hour() > 1 ? 2 : 1, 'day');
    } else if (/^morgen/.test(lowerText)) {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (/^gisteren/.test(lowerText)) {
      startMoment = startMoment.add(-1, 'day');
    } else if (/^eergisteren/.test(lowerText)) {
      startMoment = startMoment.add(-2, 'day');
    } else if (/afgelopen\s*nacht/.test(lowerText)) {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText === 'nu') {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    var secondMatch = match[3] || match[4] || match[5];

    if (secondMatch) {
      switch (secondMatch.toLowerCase()) {
        case 'vroeg in de ochtend':
          result.start.imply('hour', 6);
          break;

        case 'ochtend':
        case 'morgen':
        case '\'s ochtends':
        case '\'s morgends':
          result.start.imply('hour', 9);
          break;

        case 'tussen de middag':
          result.start.imply('hour', 12);
          break;

        case 'middag':
        case 'in de middag':
        case '\'s middags':
          result.start.imply('hour', 15);
          result.start.imply('meridiem', 1);
          break;

        case 'avond':
        case "'s avonds":
          result.start.imply('hour', 18);
          result.start.imply('meridiem', 1);
          break;

        case 'nacht':
        case "'s nachts":
          result.start.imply('hour', 0);
          break;
      }
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['NLCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __nested_webpack_require_238477__) {

var Parser = __nested_webpack_require_238477__(1).Parser;

var ParsedResult = __nested_webpack_require_238477__(0).ParsedResult;

var PATTERN = /(\W|^)((deze)?\s*('s morgens|'s ochtends|in de ochtend|'s middags|in de middag|'s avonds|in de avond|'s nachts|ochtend|tussen de middag|middag|avond|nacht))/i;
var TIME_MATCH = 4;

exports.Parser = function ENCasualTimeParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    if (!match[TIME_MATCH]) TIME_MATCH = 3;

    switch (match[TIME_MATCH].toLowerCase()) {
      case 'middag':
      case 'in de middag':
      case '\'s middags':
        result.start.imply('meridiem', 1);
        result.start.imply('hour', 15);
        break;

      case 'avond':
      case 'in de avond':
      case '\'s avonds':
        result.start.imply('meridiem', 1);
        result.start.imply('hour', 20);
        break;

      case 'middernacht':
      case 'nacht':
      case '\'s nachts':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 0);
        break;

      case 'ochtend':
      case '\s morgens':
      case '\s ochtends':
      case 'in de ochtend':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 9);
        break;

      case 'tussen de middag':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 12);
        break;
    }

    result.tags['NLCasualTimeParser'] = true;
    return result;
  };
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __nested_webpack_require_240249__) {

/*
  
*/
var Refiner = __nested_webpack_require_240249__(3).Refiner;

exports.Refiner = function OverlapRemovalRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var filteredResults = [];
    var prevResult = results[0];

    for (var i = 1; i < results.length; i++) {
      var result = results[i]; // If overlap, compare the length and discard the shorter one

      if (result.index < prevResult.index + prevResult.text.length) {
        if (result.text.length > prevResult.text.length) {
          prevResult = result;
        }
      } else {
        filteredResults.push(prevResult);
        prevResult = result;
      }
    } // The last one


    if (prevResult != null) {
      filteredResults.push(prevResult);
    }

    return filteredResults;
  };
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __nested_webpack_require_241156__) {

/*
  
*/
var Refiner = __nested_webpack_require_241156__(3).Refiner;

var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(GMT|UTC)?(\\+|\\-)(\\d{1,2}):?(\\d{2})", 'i');
var TIMEZONE_OFFSET_SIGN_GROUP = 2;
var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 3;
var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 4;

exports.Refiner = function ExtractTimezoneOffsetRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    results.forEach(function (result) {
      if (result.start.isCertain('timezoneOffset')) {
        return;
      }

      var match = TIMEZONE_OFFSET_PATTERN.exec(text.substring(result.index + result.text.length));

      if (!match) {
        return;
      }

      var hourOffset = parseInt(match[TIMEZONE_OFFSET_HOUR_OFFSET_GROUP]);
      var minuteOffset = parseInt(match[TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP]);
      var timezoneOffset = hourOffset * 60 + minuteOffset;

      if (match[TIMEZONE_OFFSET_SIGN_GROUP] === '-') {
        timezoneOffset = -timezoneOffset;
      }

      if (result.end != null) {
        result.end.assign('timezoneOffset', timezoneOffset);
      }

      result.start.assign('timezoneOffset', timezoneOffset);
      result.text += match[0];
      result.tags['ExtractTimezoneOffsetRefiner'] = true;
    });
    return results;
  };
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __nested_webpack_require_242512__) {

/*

*/
var Refiner = __nested_webpack_require_242512__(3).Refiner; // Map ABBR -> Offset in minute


var TIMEZONE_NAME_PATTERN = new RegExp("^\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", 'i');
var DEFAULT_TIMEZONE_ABBR_MAP = {
  "ACDT": 630,
  "ACST": 570,
  "ADT": -180,
  "AEDT": 660,
  "AEST": 600,
  "AFT": 270,
  "AKDT": -480,
  "AKST": -540,
  "ALMT": 360,
  "AMST": -180,
  "AMT": -240,
  "ANAST": 720,
  "ANAT": 720,
  "AQTT": 300,
  "ART": -180,
  "AST": -240,
  "AWDT": 540,
  "AWST": 480,
  "AZOST": 0,
  "AZOT": -60,
  "AZST": 300,
  "AZT": 240,
  "BNT": 480,
  "BOT": -240,
  "BRST": -120,
  "BRT": -180,
  "BST": 60,
  "BTT": 360,
  "CAST": 480,
  "CAT": 120,
  "CCT": 390,
  "CDT": -300,
  "CEST": 120,
  "CET": 60,
  "CHADT": 825,
  "CHAST": 765,
  "CKT": -600,
  "CLST": -180,
  "CLT": -240,
  "COT": -300,
  "CST": -360,
  "CVT": -60,
  "CXT": 420,
  "ChST": 600,
  "DAVT": 420,
  "EASST": -300,
  "EAST": -360,
  "EAT": 180,
  "ECT": -300,
  "EDT": -240,
  "EEST": 180,
  "EET": 120,
  "EGST": 0,
  "EGT": -60,
  "EST": -300,
  "ET": -300,
  "FJST": 780,
  "FJT": 720,
  "FKST": -180,
  "FKT": -240,
  "FNT": -120,
  "GALT": -360,
  "GAMT": -540,
  "GET": 240,
  "GFT": -180,
  "GILT": 720,
  "GMT": 0,
  "GST": 240,
  "GYT": -240,
  "HAA": -180,
  "HAC": -300,
  "HADT": -540,
  "HAE": -240,
  "HAP": -420,
  "HAR": -360,
  "HAST": -600,
  "HAT": -90,
  "HAY": -480,
  "HKT": 480,
  "HLV": -210,
  "HNA": -240,
  "HNC": -360,
  "HNE": -300,
  "HNP": -480,
  "HNR": -420,
  "HNT": -150,
  "HNY": -540,
  "HOVT": 420,
  "ICT": 420,
  "IDT": 180,
  "IOT": 360,
  "IRDT": 270,
  "IRKST": 540,
  "IRKT": 540,
  "IRST": 210,
  "IST": 330,
  "JST": 540,
  "KGT": 360,
  "KRAST": 480,
  "KRAT": 480,
  "KST": 540,
  "KUYT": 240,
  "LHDT": 660,
  "LHST": 630,
  "LINT": 840,
  "MAGST": 720,
  "MAGT": 720,
  "MART": -510,
  "MAWT": 300,
  "MDT": -360,
  "MESZ": 120,
  "MEZ": 60,
  "MHT": 720,
  "MMT": 390,
  "MSD": 240,
  "MSK": 240,
  "MST": -420,
  "MUT": 240,
  "MVT": 300,
  "MYT": 480,
  "NCT": 660,
  "NDT": -90,
  "NFT": 690,
  "NOVST": 420,
  "NOVT": 360,
  "NPT": 345,
  "NST": -150,
  "NUT": -660,
  "NZDT": 780,
  "NZST": 720,
  "OMSST": 420,
  "OMST": 420,
  "PDT": -420,
  "PET": -300,
  "PETST": 720,
  "PETT": 720,
  "PGT": 600,
  "PHOT": 780,
  "PHT": 480,
  "PKT": 300,
  "PMDT": -120,
  "PMST": -180,
  "PONT": 660,
  "PST": -480,
  "PT": -480,
  "PWT": 540,
  "PYST": -180,
  "PYT": -240,
  "RET": 240,
  "SAMT": 240,
  "SAST": 120,
  "SBT": 660,
  "SCT": 240,
  "SGT": 480,
  "SRT": -180,
  "SST": -660,
  "TAHT": -600,
  "TFT": 300,
  "TJT": 300,
  "TKT": 780,
  "TLT": 540,
  "TMT": 300,
  "TVT": 720,
  "ULAT": 480,
  "UTC": 0,
  "UYST": -120,
  "UYT": -180,
  "UZT": 300,
  "VET": -210,
  "VLAST": 660,
  "VLAT": 660,
  "VUT": 660,
  "WAST": 120,
  "WAT": 60,
  "WEST": 60,
  "WESZ": 60,
  "WET": 0,
  "WEZ": 0,
  "WFT": 720,
  "WGST": -120,
  "WGT": -180,
  "WIB": 420,
  "WIT": 540,
  "WITA": 480,
  "WST": 780,
  "WT": 0,
  "YAKST": 600,
  "YAKT": 600,
  "YAPT": 600,
  "YEKST": 360,
  "YEKT": 360
};

exports.Refiner = function ExtractTimezoneAbbrRefiner(config) {
  Refiner.call(this, arguments);

  this.refine = function (text, results, opt) {
    var timezones = new Object(DEFAULT_TIMEZONE_ABBR_MAP);

    if (opt.timezones) {
      for (var name in opt.timezones) {
        timezones[name] = opt.timezones[name];
      }
    }

    results.forEach(function (result) {
      if (!result.tags['ENTimeExpressionParser'] && !result.tags['ENCasualTimeParser'] && !result.tags['ZHTimeExpressionParser'] && !result.tags['FRTimeExpressionParser'] && !result.tags['DETimeExpressionParser']) {
        return;
      }

      var match = TIMEZONE_NAME_PATTERN.exec(text.substring(result.index + result.text.length));

      if (match) {
        var timezoneAbbr = match[1].toUpperCase();

        if (timezones[timezoneAbbr] === undefined) {
          return;
        }

        var timezoneOffset = timezones[timezoneAbbr];

        if (!result.start.isCertain('timezoneOffset')) {
          result.start.assign('timezoneOffset', timezoneOffset);
        }

        if (result.end != null && !result.end.isCertain('timezoneOffset')) {
          result.end.assign('timezoneOffset', timezoneOffset);
        }

        result.text += match[0];
        result.tags['ExtractTimezoneAbbrRefiner'] = true;
      }
    });
    return results;
  };
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __nested_webpack_require_246947__) {

/*
    Enforce 'forwardDate' option to on the results. When there are missing component,
    e.g. "March 12-13 (without year)" or "Thursday", the refiner will try to adjust the result
    into the future instead of the past.
*/
var dayjs = __nested_webpack_require_246947__(2);

var Refiner = __nested_webpack_require_246947__(3).Refiner;

exports.Refiner = function ForwardDateRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (!opt['forwardDate']) {
      return results;
    }

    results.forEach(function (result) {
      var refMoment = dayjs(result.ref);

      if (result.start.isOnlyDayMonthComponent() && refMoment.isAfter(result.start.dayjs())) {
        // Adjust year into the future
        for (var i = 0; i < 3 && refMoment.isAfter(result.start.dayjs()); i++) {
          result.start.imply('year', result.start.get('year') + 1);

          if (result.end && !result.end.isCertain('year')) {
            result.end.imply('year', result.end.get('year') + 1);
          }
        }

        result.tags['ForwardDateRefiner'] = true;
      }

      if (result.start.isOnlyWeekdayComponent() && refMoment.isAfter(result.start.dayjs())) {
        // Adjust date to the coming week
        if (refMoment.day() > result.start.get('weekday')) {
          refMoment = refMoment.day(result.start.get('weekday') + 7);
        } else {
          refMoment = refMoment.day(result.start.get('weekday'));
        }

        result.start.imply('day', refMoment.date());
        result.start.imply('month', refMoment.month() + 1);
        result.start.imply('year', refMoment.year());
        result.tags['ForwardDateRefiner'] = true;
      }
    });
    return results;
  };
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __nested_webpack_require_248714__) {

/*
  
*/
var Filter = __nested_webpack_require_248714__(3).Filter;

exports.Refiner = function UnlikelyFormatFilter() {
  Filter.call(this);

  this.isValid = function (text, result, opt) {
    if (result.text.replace(' ', '').match(/^\d*(\.\d*)?$/)) {
      return false;
    }

    return true;
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __nested_webpack_require_249082__) {

/*

*/
var ParsedComponents = __nested_webpack_require_249082__(0).ParsedComponents;

var Refiner = __nested_webpack_require_249082__(3).Refiner;

var PATTERN = new RegExp("^\\s*(at|after|before|on|,|-|\\(|\\))?\\s*$");

function isMoreSpecific(prevResult, currResult) {
  var moreSpecific = false;

  if (prevResult.start.isCertain('year')) {
    if (!currResult.start.isCertain('year')) {
      moreSpecific = true;
    } else {
      if (prevResult.start.isCertain('month')) {
        if (!currResult.start.isCertain('month')) {
          moreSpecific = true;
        } else {
          if (prevResult.start.isCertain('day') && !currResult.start.isCertain('day')) {
            moreSpecific = true;
          }
        }
      }
    }
  }

  return moreSpecific;
}

function isAbleToMerge(text, prevResult, currResult) {
  var textBetween = text.substring(prevResult.index + prevResult.text.length, currResult.index); // Only accepts merge if one of them comes from casual relative date

  var includesRelativeResult = prevResult.tags['ENRelativeDateFormatParser'] || currResult.tags['ENRelativeDateFormatParser']; // We assume they refer to the same date if all date fields are implied

  var referToSameDate = !prevResult.start.isCertain('day') && !prevResult.start.isCertain('month') && !prevResult.start.isCertain('year'); // If both years are certain, that determines if they refer to the same date
  // but with one more specific than the other

  if (prevResult.start.isCertain('year') && currResult.start.isCertain('year')) referToSameDate = prevResult.start.get('year') === currResult.start.get('year'); // We now test with the next level (month) if they refer to the same date

  if (prevResult.start.isCertain('month') && currResult.start.isCertain('month')) referToSameDate = prevResult.start.get('month') === currResult.start.get('month') && referToSameDate;
  return includesRelativeResult && textBetween.match(PATTERN) && referToSameDate;
}

function mergeResult(text, specificResult, nonSpecificResult) {
  var specificDate = specificResult.start;
  var nonSpecificDate = nonSpecificResult.start;
  var startIndex = Math.min(specificResult.index, nonSpecificResult.index);
  var endIndex = Math.max(specificResult.index + specificResult.text.length, nonSpecificResult.index + nonSpecificResult.text.length);
  specificResult.index = startIndex;
  specificResult.text = text.substring(startIndex, endIndex);

  for (var tag in nonSpecificResult.tags) {
    specificResult.tags[tag] = true;
  }

  specificResult.tags['ENPrioritizeSpecificDateRefiner'] = true;
  return specificResult;
}

exports.Refiner = function ENPrioritizeSpecificDateRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isMoreSpecific(prevResult, currResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, prevResult, currResult);
        currResult = null;
        i += 1;
      } else if (isMoreSpecific(currResult, prevResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, currResult, prevResult);
        currResult = null;
        i += 1;
      }

      mergedResult.push(prevResult);
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __nested_webpack_require_252690__) {

/*
  
*/
var ENMergeDateRangeRefiner = __nested_webpack_require_252690__(9).Refiner;

exports.Refiner = function JPMergeDateRangeRefiner() {
  ENMergeDateRangeRefiner.call(this);

  this.pattern = function () {
    return /^\s*(から|ー)\s*$/i;
  };
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __nested_webpack_require_253002__) {

/*
  
*/
var Refiner = __nested_webpack_require_253002__(3).Refiner;

exports.Refiner = function FRMergeDateRangeRefiner() {
  Refiner.call(this);

  this.pattern = function () {
    return /^\s*(à|a|\-)\s*$/i;
  };

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (!prevResult.end && !currResult.end && this.isAbleToMerge(text, prevResult, currResult)) {
        prevResult = this.mergeResult(text, prevResult, currResult);
        currResult = null;
        i += 1;
      }

      mergedResult.push(prevResult);
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };

  this.isAbleToMerge = function (text, result1, result2) {
    var begin = result1.index + result1.text.length;
    var end = result2.index;
    var textBetween = text.substring(begin, end);
    return textBetween.match(this.pattern());
  };

  this.isWeekdayResult = function (result) {
    return result.start.isCertain('weekday') && !result.start.isCertain('day');
  };

  this.mergeResult = function (text, fromResult, toResult) {
    if (!this.isWeekdayResult(fromResult) && !this.isWeekdayResult(toResult)) {
      for (var key in toResult.start.knownValues) {
        if (!fromResult.start.isCertain(key)) {
          fromResult.start.assign(key, toResult.start.get(key));
        }
      }

      for (var key in fromResult.start.knownValues) {
        if (!toResult.start.isCertain(key)) {
          toResult.start.assign(key, fromResult.start.get(key));
        }
      }
    }

    if (fromResult.start.date().getTime() > toResult.start.date()) {
      var tmp = toResult;
      toResult = fromResult;
      fromResult = tmp;
    }

    fromResult.end = toResult.start;

    for (var tag in toResult.tags) {
      fromResult.tags[tag] = true;
    }

    var startIndex = Math.min(fromResult.index, toResult.index);
    var endIndex = Math.max(fromResult.index + fromResult.text.length, toResult.index + toResult.text.length);
    fromResult.index = startIndex;
    fromResult.text = text.substring(startIndex, endIndex);
    fromResult.tags[this.constructor.name] = true;
    return fromResult;
  };
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __nested_webpack_require_255456__) {

/*
    
*/
var ParsedComponents = __nested_webpack_require_255456__(0).ParsedComponents;

var Refiner = __nested_webpack_require_255456__(3).Refiner;

var mergeDateTimeComponent = __nested_webpack_require_255456__(5).mergeDateTimeComponent;

var PATTERN = new RegExp("^\\s*(T|à|a|vers|de|,|-)?\\s*$");

function isDateOnly(result) {
  return !result.start.isCertain('hour') || result.tags['FRCasualDateParser'];
}

function isTimeOnly(result) {
  return !result.start.isCertain('month') && !result.start.isCertain('weekday');
}

function isAbleToMerge(text, prevResult, curResult) {
  var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
  return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult) {
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

    if (dateResult.end == null && endDateTime.date().getTime() < beginDateTime.date().getTime()) {
      // Ex. 9pm - 1am
      if (endDateTime.isCertain('day')) {
        endDateTime.assign('day', endDateTime.get('day') + 1);
      } else {
        endDateTime.imply('day', endDateTime.get('day') + 1);
      }
    }

    dateResult.end = endDateTime;
  }

  dateResult.start = beginDateTime;
  var startIndex = Math.min(dateResult.index, timeResult.index);
  var endIndex = Math.max(dateResult.index + dateResult.text.length, timeResult.index + timeResult.text.length);
  dateResult.index = startIndex;
  dateResult.text = text.substring(startIndex, endIndex);

  for (var tag in timeResult.tags) {
    dateResult.tags[tag] = true;
  }

  dateResult.tags['FRMergeDateAndTimeRefiner'] = true;
  return dateResult;
}

exports.Refiner = function FRMergeDateTimeRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isDateOnly(prevResult) && isTimeOnly(currResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, prevResult, currResult);
        currResult = null;
        i += 1;
      } else if (isDateOnly(currResult) && isTimeOnly(prevResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, currResult, prevResult);
        currResult = null;
        i += 1;
      }

      mergedResult.push(prevResult);
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __nested_webpack_require_258467__) {

/*
  
*/
var ENMergeDateRangeRefiner = __nested_webpack_require_258467__(9).Refiner;

exports.Refiner = function DEMergeDateRangeRefiner() {
  ENMergeDateRangeRefiner.call(this);

  this.pattern = function () {
    return /^\s*(bis(?:\s*(?:am|zum))?|\-)\s*$/i;
  };
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __nested_webpack_require_258799__) {

/*
    
*/
var ParsedComponents = __nested_webpack_require_258799__(0).ParsedComponents;

var Refiner = __nested_webpack_require_258799__(3).Refiner;

var mergeDateTimeComponent = __nested_webpack_require_258799__(5).mergeDateTimeComponent;

var isDateOnly = __nested_webpack_require_258799__(5).isDateOnly;

var isTimeOnly = __nested_webpack_require_258799__(5).isTimeOnly;

var PATTERN = new RegExp("^\\s*(T|um|am|,|-)?\\s*$");

function isAbleToMerge(text, prevResult, curResult) {
  var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
  return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult) {
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

    if (dateResult.end == null && endDateTime.date().getTime() < beginDateTime.date().getTime()) {
      // Ex. 9pm - 1am
      if (endDateTime.isCertain('day')) {
        endDateTime.assign('day', endDateTime.get('day') + 1);
      } else {
        endDateTime.imply('day', endDateTime.get('day') + 1);
      }
    }

    dateResult.end = endDateTime;
  }

  dateResult.start = beginDateTime;
  var startIndex = Math.min(dateResult.index, timeResult.index);
  var endIndex = Math.max(dateResult.index + dateResult.text.length, timeResult.index + timeResult.text.length);
  dateResult.index = startIndex;
  dateResult.text = text.substring(startIndex, endIndex);

  for (var tag in timeResult.tags) {
    dateResult.tags[tag] = true;
  }

  dateResult.tags['DEMergeDateAndTimeRefiner'] = true;
  return dateResult;
}

exports.Refiner = function DEMergeDateTimeRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isDateOnly(prevResult) && isTimeOnly(currResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, prevResult, currResult);
        currResult = null;
        i += 1;
      } else if (isDateOnly(currResult) && isTimeOnly(prevResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, currResult, prevResult);
        currResult = null;
        i += 1;
      }

      mergedResult.push(prevResult);
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __nested_webpack_require_261682__) {

/*

*/
var ENMergeDateRangeRefiner = __nested_webpack_require_261682__(9).Refiner;

exports.Refiner = function NLMergeDateRangeRefiner() {
  ENMergeDateRangeRefiner.call(this);

  this.pattern = function () {
    return /^\s*(tot|t\/m|tot en met|\\-)\s*$/i;
  };
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __nested_webpack_require_262011__) {

/*

*/
var ParsedComponents = __nested_webpack_require_262011__(0).ParsedComponents;

var Refiner = __nested_webpack_require_262011__(3).Refiner;

var mergeDateTimeComponent = __nested_webpack_require_262011__(5).mergeDateTimeComponent;

var isDateOnly = __nested_webpack_require_262011__(5).isDateOnly;

var isTimeOnly = __nested_webpack_require_262011__(5).isTimeOnly;

var PATTERN = new RegExp("^\\s*(T|op|om|voor|na|van|,|-)\\s*$");

function isAbleToMerge(text, prevResult, curResult) {
  var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
  return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult) {
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

    if (dateResult.end == null && endDateTime.date().getTime() < beginDateTime.date().getTime()) {
      // Ex. 9pm - 1am
      if (endDateTime.isCertain('day')) {
        endDateTime.assign('day', endDateTime.get('day') + 1);
      } else {
        endDateTime.imply('day', endDateTime.get('day') + 1);
      }
    }

    dateResult.end = endDateTime;
  }

  dateResult.start = beginDateTime;
  var startIndex = Math.min(dateResult.index, timeResult.index);
  var endIndex = Math.max(dateResult.index + dateResult.text.length, timeResult.index + timeResult.text.length);
  dateResult.index = startIndex;
  dateResult.text = text.substring(startIndex, endIndex);

  for (var tag in timeResult.tags) {
    dateResult.tags[tag] = true;
  }

  dateResult.tags['NLMergeDateAndTimeRefiner'] = true;
  return dateResult;
}

exports.Refiner = function NLMergeDateTimeRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isDateOnly(currResult) && isTimeOnly(prevResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, currResult, prevResult);
        currResult = null;
        i += 1;
        mergedResult.push(prevResult);
      } else {
        mergedResult.push(prevResult);
      }
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=chrono.js.map

/***/ }),

/***/ 481:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

class Deprecation extends Error {
  constructor(message) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'Deprecation';
  }

}

exports.Deprecation = Deprecation;


/***/ }),

/***/ 467:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__nccwpck_require__(413));
var http = _interopDefault(__nccwpck_require__(605));
var Url = _interopDefault(__nccwpck_require__(835));
var https = _interopDefault(__nccwpck_require__(211));
var zlib = _interopDefault(__nccwpck_require__(761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __nccwpck_require__(877).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 223:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var wrappy = __nccwpck_require__(940)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 952:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const chrono = __nccwpck_require__(737)

const matcher = /^remind @?([^\s]+)(?: to )?([\s\S]*)$/

const parser = new chrono.Chrono()
parser.refiners.push(__nccwpck_require__(938))

const options = {
  forwardDate: true,
  startOfDay: 9
}

module.exports = (input, from) => {
  const match = input.match(matcher)
  if (!match) {
    // This doesn't look like a reminder, so bail early
    return null
  }

  // Pull out the initial matches
  let [, who, what] = match

  // Use chrono to extract the `when` from the `what`
  const when = parser.parse(what, from, options)

  if (when.length < 1) {
    // What kind of reminder doesn't have a date?
    return null
  }

  // Remove any time expressions from the `what`
  when.forEach(w => {
    what = what.replace(w.text, '')
  })

  // Clean up whitespace and common connecting words
  what = what.trim()
  what = what.replace(/^(to|that) /, '').replace(/ on$/, '')

  return {who, what, when: when[0].start.date()}
}


/***/ }),

/***/ 938:
/***/ ((module) => {

module.exports = {
  refine (text, results, opt) {
    if (opt.startOfDay) {
      results.forEach(result => {
        if (!result.start.isCertain('hour')) {
          result.start.imply('hour', opt.startOfDay)
          result.tags['StartOfWorkDayRefiner'] = true
        }
      })
    }

    return results
  }
}


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(219);


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(631);
var tls = __nccwpck_require__(16);
var http = __nccwpck_require__(605);
var https = __nccwpck_require__(211);
var events = __nccwpck_require__(614);
var assert = __nccwpck_require__(357);
var util = __nccwpck_require__(669);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 429:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function getUserAgent() {
  if (typeof navigator === "object" && "userAgent" in navigator) {
    return navigator.userAgent;
  }

  if (typeof process === "object" && "version" in process) {
    return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
  }

  return "<environment undetectable>";
}

exports.getUserAgent = getUserAgent;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 940:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 992:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const parseReminder = __nccwpck_require__(952);

///{ who: 'me',
//   what: 'call the doctor',
//   when: 2017-09-12T12:00:00.000Z }
function getReminder(context, referenceDate = null) {
  const body = context.comment.body;
  if (!body.startsWith('/')) {
    return null;
  }

  const firstWord = body.slice(1, body.indexOf(' '));
  if (firstWord !== 'remind') {
    return null;
  }

  const reminder = parseReminder(body.slice(1), referenceDate);

  if (!reminder) {
    throw new Error(`Unable to parse reminder: remind ${body}`);
  }

  if (reminder.who === 'me') {
    reminder.who = context.sender.login;
  }

  return reminder;
}

function addReminderToBody(body, reminder) {
  const regex = /\n<!-- bot: (?<reminder>{"reminders":.*) -->/;
  const match = body.match(regex);

  const reminders = match ? JSON.parse(match.groups.reminder).reminders : [];
  let id = 1;
  if (reminders.length > 0) {
    id = reminders[reminders.length - 1].id + 1;
  }

  reminders.push({
    id,
    ...reminder
  });

  const comment = `\n<!-- bot: ${JSON.stringify({reminders})} -->`
  if (match) {
    return body.replace(regex, comment);
  }

  return `${body}${comment}`;
}

module.exports = { getReminder, addReminderToBody };


/***/ }),

/***/ 877:
/***/ ((module) => {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 631:
/***/ ((module) => {

"use strict";
module.exports = require("net");;

/***/ }),

/***/ 87:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 16:
/***/ ((module) => {

"use strict";
module.exports = require("tls");;

/***/ }),

/***/ 835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(186);
const github = __nccwpck_require__(438);
const {getReminder, addReminderToBody} = __nccwpck_require__(992);
const LABEL = 'reminder';

function getIssueProps(context) {
  return {
    owner: context.repository.owner,
    repo: context.repository.name,
    issue_number: context.issue.number
  };
}

function createComment(octokit, context, body) {
  return octokit.rest.issues.createComment({
    ...getIssueProps(context),
    body
  });
}

function updateIssue(octokit, context, reminder) {
  const body = addReminderToBody(context.issue.body, reminder);

  return octokit.rest.issues.update({
    ...getIssueProps(context),
    body
  });
}

async function run() {
  const context = github.context.payload;
  const owner = core.getInput('repository_owner');
  const repository = core.getInput('repository');
  context.repository = {
    owner,
    name: repository
  };
  const octokit = github.getOctokit(core.getInput('repoToken', {required:true}));
  let reminder;

  try {
    core.startGroup('parsing reminder');
    reminder = getReminder(context);

    core.info(JSON.stringify(reminder, null, 1));

    if (!reminder) {
      return;
    }
    core.endGroup();

  } catch (error) {
    core.startGroup('create error comment');
    await createComment(octokit, context, `@${context.sender.login} we had trouble parsing your reminder. Try:\n\n\`/remind me [what] [when]\``);
    core.endGroup();

    core.setFailed(error);

    return;
  }

  core.startGroup('add label');
  await octokit.rest.issues.addLabels({
    ...getIssueProps(context),
    labels: LABEL
  });
  core.endGroup();

  core.startGroup('update issue');
  await updateIssue(octokit, context, reminder);
  core.endGroup();

  core.startGroup('add reminder comment');
  await createComment(octokit, context, `@${context.sender.login} set a reminder for **${reminder.when.toLocaleDateString()}**`);
  core.endGroup();
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map