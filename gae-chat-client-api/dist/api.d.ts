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
 * MessageApi - fetch parameter creator
 */
export declare const MessageApiFetchParamCreator: {
    messageList(params: {
        "name": string;
        "limit"?: number;
        "offset"?: number;
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
        "limit"?: number;
        "offset"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MessageCollection>;
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
     * @param limit
     * @param offset
     */
    messageList(params: {
        "name": string;
        "limit"?: number;
        "offset"?: number;
    }, options?: any): Promise<MessageCollection>;
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
        "limit"?: number;
        "offset"?: number;
    }, options?: any): Promise<MessageCollection>;
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
