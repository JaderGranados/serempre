export interface ServerResponse<T> {
    success: boolean;
    data?: T | Array<T>;
    errorMessage?: string;
}