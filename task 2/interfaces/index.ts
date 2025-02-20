interface BaseResponse {
    status: number;
}

interface SuccessResponse {
    success: boolean;
}

interface StatusMessageResponse {
    status_message: string;
    status_code: number;
}

interface RequestTokenBody extends SuccessResponse {
    expires_at: string;
    request_token: string;
}

interface SessionBody extends SuccessResponse {
    session_id: string;
}

interface CheckListStatusBody {
    id: number;
    item_present: boolean;
}

interface ApiResponse<T> extends BaseResponse {
    body: T extends CheckListStatusBody
        ? CheckListStatusBody
        : T & SuccessResponse;
}

export type RequestTokenResponse = ApiResponse<RequestTokenBody>;
export type CreateSessionResponse = ApiResponse<SessionBody>;
export type DeleteSessionResponse = ApiResponse<SuccessResponse>;
export type ListResponse = ApiResponse<
    StatusMessageResponse & SuccessResponse & { list_id: number }
>;
export type AddMovieResponse = ApiResponse<StatusMessageResponse>;
export type RemoveMovieResponse = ApiResponse<StatusMessageResponse>;
export type CheckListStatusResponse = ApiResponse<CheckListStatusBody>;
export type ClearListResponse = ApiResponse<StatusMessageResponse>;
export type DeleteListResponse = ApiResponse<StatusMessageResponse>;

export type Headers = {
    [key: string]: string;
};

export type QueryParams = {
    [key: string]: string | number | boolean;
};

export type RequestData = {
    [key: string]: unknown;
};
