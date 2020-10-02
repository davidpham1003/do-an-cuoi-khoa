import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'https://movie0706.cybersoft.edu.vn/api';

  handleError(error: any) {
    // Sử lý những error thông dụng như 500, 404, 401, 400,...
    console.log(error);
    return throwError(error);
  }

  get<T>(path: string, options = {}): Observable<T> {
    return this.http
      .get<T>(`${this.BASE_URL}/${path}`, options)
      .pipe(catchError(this.handleError));
  }

  post<T>(path: string, body = {}, options = {}): Observable<T> {
    return this.http
      .post<T>(`${this.BASE_URL}/${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  put<T>(path: string, body = {}, options = {}): Observable<T> {
    return this.http
      .put<T>(`${this.BASE_URL}/${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  delete<T>(path: string, body = {}): Observable<T> {
    return this.http
      .delete<T>(`${this.BASE_URL}/${path}`,body)
      .pipe(catchError(this.handleError));
  }
}
