/**
 * goa study chat
 * goa study chat api
 *
 * OpenAPI spec version:
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var url = require("url");
var isomorphicFetch = require("isomorphic-fetch");
var assign = require("core-js/library/fn/object/assign");
var BASE_PATH = "http://localhost:9089/api".replace(/\/+$/, "");
var BaseAPI = (function () {
    function BaseAPI(fetch, basePath) {
        if (fetch === void 0) { fetch = isomorphicFetch; }
        if (basePath === void 0) { basePath = BASE_PATH; }
        this.basePath = basePath;
        this.fetch = fetch;
    }
    return BaseAPI;
}());
exports.BaseAPI = BaseAPI;
;
/**
 * MessageApi - fetch parameter creator
 */
exports.MessageApiFetchParamCreator = {
    /**
     * Retrieve all messages.
     * @summary list message
     * @param name Name of room
     * @param limit
     * @param offset
     */
    messageList: function (params, options) {
        // verify required parameter "name" is set
        if (params["name"] == null) {
            throw new Error("Missing required parameter name when calling messageList");
        }
        var baseUrl = "/rooms/{name}/messages"
            .replace("{" + "name" + "}", "" + params["name"]);
        var urlObj = url.parse(baseUrl, true);
        urlObj.query = assign({}, urlObj.query, {
            "limit": params["limit"],
            "offset": params["offset"],
        });
        var fetchOptions = assign({}, { method: "GET" }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     * Create new message  Required security scopes:   * `api:access`
     * @summary post message
     * @param name Name of room
     * @param payload
     */
    messagePost: function (params, options) {
        // verify required parameter "name" is set
        if (params["name"] == null) {
            throw new Error("Missing required parameter name when calling messagePost");
        }
        // verify required parameter "payload" is set
        if (params["payload"] == null) {
            throw new Error("Missing required parameter payload when calling messagePost");
        }
        var baseUrl = "/rooms/{name}/messages"
            .replace("{" + "name" + "}", "" + params["name"]);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: "POST" }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["payload"]) {
            fetchOptions.body = JSON.stringify(params["payload"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     * Retrieve message with given id
     * @summary show message
     * @param messageID
     * @param name Name of room
     */
    messageShow: function (params, options) {
        // verify required parameter "messageID" is set
        if (params["messageID"] == null) {
            throw new Error("Missing required parameter messageID when calling messageShow");
        }
        // verify required parameter "name" is set
        if (params["name"] == null) {
            throw new Error("Missing required parameter name when calling messageShow");
        }
        var baseUrl = "/rooms/{name}/messages/{messageID}"
            .replace("{" + "messageID" + "}", "" + params["messageID"])
            .replace("{" + "name" + "}", "" + params["name"]);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: "GET" }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
};
/**
 * MessageApi - functional programming interface
 */
exports.MessageApiFp = {
    /**
     * Retrieve all messages.
     * @summary list message
     * @param name Name of room
     * @param limit
     * @param offset
     */
    messageList: function (params, options) {
        var fetchArgs = exports.MessageApiFetchParamCreator.messageList(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     * Create new message  Required security scopes:   * `api:access`
     * @summary post message
     * @param name Name of room
     * @param payload
     */
    messagePost: function (params, options) {
        var fetchArgs = exports.MessageApiFetchParamCreator.messagePost(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     * Retrieve message with given id
     * @summary show message
     * @param messageID
     * @param name Name of room
     */
    messageShow: function (params, options) {
        var fetchArgs = exports.MessageApiFetchParamCreator.messageShow(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
};
/**
 * MessageApi - object-oriented interface
 */
var MessageApi = (function (_super) {
    __extends(MessageApi, _super);
    function MessageApi() {
        _super.apply(this, arguments);
    }
    /**
     * Retrieve all messages.
     * @summary list message
     * @param name Name of room
     * @param limit
     * @param offset
     */
    MessageApi.prototype.messageList = function (params, options) {
        return exports.MessageApiFp.messageList(params, options)(this.fetch, this.basePath);
    };
    /**
     * Create new message  Required security scopes:   * `api:access`
     * @summary post message
     * @param name Name of room
     * @param payload
     */
    MessageApi.prototype.messagePost = function (params, options) {
        return exports.MessageApiFp.messagePost(params, options)(this.fetch, this.basePath);
    };
    /**
     * Retrieve message with given id
     * @summary show message
     * @param messageID
     * @param name Name of room
     */
    MessageApi.prototype.messageShow = function (params, options) {
        return exports.MessageApiFp.messageShow(params, options)(this.fetch, this.basePath);
    };
    return MessageApi;
}(BaseAPI));
exports.MessageApi = MessageApi;
;
/**
 * MessageApi - factory interface
 */
exports.MessageApiFactory = function (fetch, basePath) {
    return {
        /**
         * Retrieve all messages.
         * @summary list message
         * @param name Name of room
         * @param limit
         * @param offset
         */
        messageList: function (params, options) {
            return exports.MessageApiFp.messageList(params, options)(fetch, basePath);
        },
        /**
         * Create new message  Required security scopes:   * `api:access`
         * @summary post message
         * @param name Name of room
         * @param payload
         */
        messagePost: function (params, options) {
            return exports.MessageApiFp.messagePost(params, options)(fetch, basePath);
        },
        /**
         * Retrieve message with given id
         * @summary show message
         * @param messageID
         * @param name Name of room
         */
        messageShow: function (params, options) {
            return exports.MessageApiFp.messageShow(params, options)(fetch, basePath);
        },
    };
};
/**
 * RoomApi - fetch parameter creator
 */
exports.RoomApiFetchParamCreator = {
    /**
     * Retrieve all rooms.
     * @summary list room
     * @param limit
     * @param offset
     */
    roomList: function (params, options) {
        var baseUrl = "/rooms";
        var urlObj = url.parse(baseUrl, true);
        urlObj.query = assign({}, urlObj.query, {
            "limit": params["limit"],
            "offset": params["offset"],
        });
        var fetchOptions = assign({}, { method: "GET" }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     * Create new Room  Required security scopes:   * `api:access`
     * @summary post room
     * @param payload
     */
    roomPost: function (params, options) {
        // verify required parameter "payload" is set
        if (params["payload"] == null) {
            throw new Error("Missing required parameter payload when calling roomPost");
        }
        var baseUrl = "/rooms";
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: "POST" }, options);
        var contentTypeHeader = {};
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["payload"]) {
            fetchOptions.body = JSON.stringify(params["payload"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /**
     * Retrieve room with given name
     * @summary show room
     * @param name Name of room
     */
    roomShow: function (params, options) {
        // verify required parameter "name" is set
        if (params["name"] == null) {
            throw new Error("Missing required parameter name when calling roomShow");
        }
        var baseUrl = "/rooms/{name}"
            .replace("{" + "name" + "}", "" + params["name"]);
        var urlObj = url.parse(baseUrl, true);
        var fetchOptions = assign({}, { method: "GET" }, options);
        var contentTypeHeader = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
};
/**
 * RoomApi - functional programming interface
 */
exports.RoomApiFp = {
    /**
     * Retrieve all rooms.
     * @summary list room
     * @param limit
     * @param offset
     */
    roomList: function (params, options) {
        var fetchArgs = exports.RoomApiFetchParamCreator.roomList(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     * Create new Room  Required security scopes:   * `api:access`
     * @summary post room
     * @param payload
     */
    roomPost: function (params, options) {
        var fetchArgs = exports.RoomApiFetchParamCreator.roomPost(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }
                else {
                    throw response;
                }
            });
        };
    },
    /**
     * Retrieve room with given name
     * @summary show room
     * @param name Name of room
     */
    roomShow: function (params, options) {
        var fetchArgs = exports.RoomApiFetchParamCreator.roomShow(params, options);
        return function (fetch, basePath) {
            if (fetch === void 0) { fetch = isomorphicFetch; }
            if (basePath === void 0) { basePath = BASE_PATH; }
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            });
        };
    },
};
/**
 * RoomApi - object-oriented interface
 */
var RoomApi = (function (_super) {
    __extends(RoomApi, _super);
    function RoomApi() {
        _super.apply(this, arguments);
    }
    /**
     * Retrieve all rooms.
     * @summary list room
     * @param limit
     * @param offset
     */
    RoomApi.prototype.roomList = function (params, options) {
        return exports.RoomApiFp.roomList(params, options)(this.fetch, this.basePath);
    };
    /**
     * Create new Room  Required security scopes:   * `api:access`
     * @summary post room
     * @param payload
     */
    RoomApi.prototype.roomPost = function (params, options) {
        return exports.RoomApiFp.roomPost(params, options)(this.fetch, this.basePath);
    };
    /**
     * Retrieve room with given name
     * @summary show room
     * @param name Name of room
     */
    RoomApi.prototype.roomShow = function (params, options) {
        return exports.RoomApiFp.roomShow(params, options)(this.fetch, this.basePath);
    };
    return RoomApi;
}(BaseAPI));
exports.RoomApi = RoomApi;
;
/**
 * RoomApi - factory interface
 */
exports.RoomApiFactory = function (fetch, basePath) {
    return {
        /**
         * Retrieve all rooms.
         * @summary list room
         * @param limit
         * @param offset
         */
        roomList: function (params, options) {
            return exports.RoomApiFp.roomList(params, options)(fetch, basePath);
        },
        /**
         * Create new Room  Required security scopes:   * `api:access`
         * @summary post room
         * @param payload
         */
        roomPost: function (params, options) {
            return exports.RoomApiFp.roomPost(params, options)(fetch, basePath);
        },
        /**
         * Retrieve room with given name
         * @summary show room
         * @param name Name of room
         */
        roomShow: function (params, options) {
            return exports.RoomApiFp.roomShow(params, options)(fetch, basePath);
        },
    };
};