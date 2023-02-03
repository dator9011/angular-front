import { Injectable } from '@angular/core';
import { Account, Usuario} from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    /* this.myAppUrl = environment.endpoint; */
    this.myAppUrl = 'https://localhost:44384';
    this.myApiUrl = '/api/account/';
  }
  //https://localhost:44384/api/account/register -- Post
  saveUser(account: Account): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + 'register', account);
  }

  loginUser(user: Usuario): Observable<any>{
    return this.http.post <any> (this.myAppUrl + this.myApiUrl + 'login', user, {observe: 'response' as 'body'})
      .pipe(tap(user => {return user;
      }));
  }

  logOut(): Observable<any>{
    return this.http.post <any> (this.myAppUrl + this.myApiUrl + 'logout', {observe: 'response' as 'body'});
  }

  setLocalStorageToken(data: any): void{
    localStorage.setItem('userToken',data);
  }

  setLocalStorageUserName(data: any): void{
    localStorage.setItem('userName',data);
  }

  getUserToken(): string{
      return localStorage.getItem('userToken')!;
  }

  getUserName(): string{
    return localStorage.getItem('userName')!;
  }

  removeLocalStorage(): void{
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
  }

  
}
