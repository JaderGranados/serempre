export interface PaginationQuery{
    page: number;
    perPage: number;
    order: "asc" | "desc" | "DESC" | "ASC";
}