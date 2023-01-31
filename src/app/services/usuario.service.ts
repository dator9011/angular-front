import { Injectable } from '@angular/core';
import { Account, Usuario} from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    /* this.myAppUrl = environment.endpoint; */
    this.myAppUrl = 'https://localhost:44384';
    this.myApiUrl = '/api/account/register';
  }
  //https://localhost:44384/api/account/register -- Post
  saveUser(account: Account): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, account);
  }
}
