import { Pagination } from ".";

type ApiResponse<T> = {
   data: T;
   message: string;
   code: number;
   pagination?: Pagination
}