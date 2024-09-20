import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { signal } from "@angular/core";
import { PaginatedResult } from "../_models/pagination";
import { map } from "rxjs";

  export function getPaginatedResult<T>(url: string, params: HttpParams, http: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    return http.get<T>(url, {observe: 'response', params}).pipe(
      map((response: { body: any; headers: { get: (arg0: string) => any; }; }) => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult; 
      })
    );
  }

  export function getPaginatedResponse<T>(response: HttpResponse<T>,
     paginatedResultSignal: ReturnType<typeof signal<PaginatedResult<T> | null>>) {
        paginatedResultSignal.set({
      items: response.body as T,
      pagination: JSON.parse(response.headers.get('Pagination')!)
     })
  }

  export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    if (pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    return params;
  }