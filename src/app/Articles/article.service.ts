import { Injectable } from '@angular/core';
// import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Article } from './article';
import { _throw as throwError } from 'rxjs/observable/throw';
import 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ArticleService {

  articleUrl = "http://localhost:3000/articles";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occured', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something went wrong please try again later');
  }

  private extractData(res: Response){
    let body = res;
    return body;
  }

  getAllArticles(): Observable<any> {
    return this.http.get(this.articleUrl, httpOptions).map(this.extractData).catch(this.handleError);
  }

  createArticle(data): Observable<any> {
    return this.http.post(this.articleUrl, data, httpOptions).map(this.extractData).catch(this.handleError);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get(this.articleUrl + '/' + id, httpOptions).map(this.extractData).catch(this.handleError);
  }

}
