export interface FetchAPI {
    (url: string, init?: any): Promise<any>;
}
export interface FetchArgs {
    url: string;
    options: any;
}
export declare class BaseAPI {
    basePath: string;
    fetch: FetchAPI;
    constructor(fetch?: FetchAPI, basePath?: string);
}
/**
 * A account (default view)
 */
export interface Account {
    "googleUserID": string;
    "lastLogin": Date;
    "name"?: string;
    "picture": string;
}
/**
 * AccountCollection is the media type for an array of Account (default view)
 */
export interface AccountCollection extends Array<Account> {
}
/**
 * Error response media type (default view)
 */
export interface Error {
    /**
     * an application-specific error code, expressed as a string value.
     */
    "code"?: string;
    /**
     * a human-readable explanation specific to this occurrence of the problem.
     */
    "detail"?: string;
    /**
     * a unique identifier for this particular occurrence of the problem.
     */
    "id"?: string;
    /**
     * a meta object containing non-standard meta-information about the error.
     */
    "meta"?: any;
    /**
     * the HTTP status code applicable to this problem, expressed as a string value.
     */
    "status"?: string;
}
/**
 * A Message (default view)
 */
export interface Message {
    "auther": string;
    "content": string;
    "created": Date;
    "id": number;
}
/**
 * MessageCollection is the media type for an array of Message (default view)
 */
export interface MessageCollection extends Array<Message> {
}
export interface MessagePayload {
    "auther": string;
    "content": string;
    "created": Date;
}
/**
 * A ResponseMessage (default view)
 */
export interface ResponseMessages {
    "messages": MessageCollection;
    "next": string;
}
/**
 * A room (default view)
 */
export interface Room {
    /**
     * Date of creation
     */
    "created": Date;
    /**
     * description of room
     */
    "description": string;
    /**
     * Name of room
     */
    "name": string;
}
/**
 * RoomCollection is the media type for an array of Room (default view)
 */
export interface RoomCollection extends Array<Room> {
}
export interface RoomPayload {
    /**
     * Date of creation
     */
    "created"?: Date;
    /**
     * description of room
     */
    "description": string;
    /**
     * Name of room
     */
    "name": string;
}
/**
 * AccountApi - fetch parameter creator
 */
export declare const AccountApiFetchParamCreator: {
    accountShow(params: {
        "ids"?: string[];
    }, options?: any): FetchArgs;
    accountShowMe(options?: any): FetchArgs;
};
/**
 * AccountApi - functional programming interface
 */
export declare const AccountApiFp: {
    accountShow(params: {
        "ids"?: string[];
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AccountCollection>;
    accountShowMe(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Account>;
};
/**
 * AccountApi - object-oriented interface
 */
export declare class AccountApi extends BaseAPI {
    /**
     * Retrieve account with given id or something
     * @summary show account
     * @param ids
     */
    accountShow(params: {
        "ids"?: Array<string>;
    }, options?: any): Promise<AccountCollection>;
    /**
     * Retrieve my account  Required security scopes:   * `api:access`
     * @summary showMe account
     */
    accountShowMe(options?: any): Promise<Account>;
}
/**
 * AccountApi - factory interface
 */
export declare const AccountApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    accountShow(params: {
        "ids"?: string[];
    }, options?: any): Promise<AccountCollection>;
    accountShowMe(options?: any): Promise<Account>;
};
/**
 * MessageApi - fetch parameter creator
 */
export declare const MessageApiFetchParamCreator: {
    messageList(params: {
        "name": string;
        "nextCursor"?: string;
    }, options?: any): FetchArgs;
    messagePost(params: {
        "name": string;
        "payload": MessagePayload;
    }, options?: any): FetchArgs;
    messageShow(params: {
        "messageID": number;
        "name": string;
    }, options?: any): FetchArgs;
};
/**
 * MessageApi - functional programming interface
 */
export declare const MessageApiFp: {
    messageList(params: {
        "name": string;
        "nextCursor"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ResponseMessages>;
    messagePost(params: {
        "name": string;
        "payload": MessagePayload;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    messageShow(params: {
        "messageID": number;
        "name": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Message>;
};
/**
 * MessageApi - object-oriented interface
 */
export declare class MessageApi extends BaseAPI {
    /**
     * Retrieve all messages.
     * @summary list message
     * @param name Name of room
     * @param nextCursor
     */
    messageList(params: {
        "name": string;
        "nextCursor"?: string;
    }, options?: any): Promise<ResponseMessages>;
    /**
     * Create new message  Required security scopes:   * `api:access`
     * @summary post message
     * @param name Name of room
     * @param payload
     */
    messagePost(params: {
        "name": string;
        "payload": MessagePayload;
    }, options?: any): Promise<any>;
    /**
     * Retrieve message with given id
     * @summary show message
     * @param messageID
     * @param name Name of room
     */
    messageShow(params: {
        "messageID": number;
        "name": string;
    }, options?: any): Promise<Message>;
}
/**
 * MessageApi - factory interface
 */
export declare const MessageApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    messageList(params: {
        "name": string;
        "nextCursor"?: string;
    }, options?: any): Promise<ResponseMessages>;
    messagePost(params: {
        "name": string;
        "payload": MessagePayload;
    }, options?: any): Promise<any>;
    messageShow(params: {
        "messageID": number;
        "name": string;
    }, options?: any): Promise<Message>;
};
/**
 * RoomApi - fetch parameter creator
 */
export declare const RoomApiFetchParamCreator: {
    roomList(params: {
        "limit"?: number;
        "offset"?: number;
    }, options?: any): FetchArgs;
    roomPost(params: {
        "payload": RoomPayload;
    }, options?: any): FetchArgs;
    roomShow(params: {
        "name": string;
    }, options?: any): FetchArgs;
};
/**
 * RoomApi - functional programming interface
 */
export declare const RoomApiFp: {
    roomList(params: {
        "limit"?: number;
        "offset"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<RoomCollection>;
    roomPost(params: {
        "payload": RoomPayload;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    roomShow(params: {
        "name": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Room>;
};
/**
 * RoomApi - object-oriented interface
 */
export declare class RoomApi extends BaseAPI {
    /**
     * Retrieve all rooms.
     * @summary list room
     * @param limit
     * @param offset
     */
    roomList(params: {
        "limit"?: number;
        "offset"?: number;
    }, options?: any): Promise<RoomCollection>;
    /**
     * Create new Room  Required security scopes:   * `api:access`
     * @summary post room
     * @param payload
     */
    roomPost(params: {
        "payload": RoomPayload;
    }, options?: any): Promise<any>;
    /**
     * Retrieve room with given name
     * @summary show room
     * @param name Name of room
     */
    roomShow(params: {
        "name": string;
    }, options?: any): Promise<Room>;
}
/**
 * RoomApi - factory interface
 */
export declare const RoomApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    roomList(params: {
        "limit"?: number;
        "offset"?: number;
    }, options?: any): Promise<RoomCollection>;
    roomPost(params: {
        "payload": RoomPayload;
    }, options?: any): Promise<any>;
    roomShow(params: {
        "name": string;
    }, options?: any): Promise<Room>;
};
