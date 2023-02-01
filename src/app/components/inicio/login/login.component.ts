import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { AccountService } from 'src/app/services/usuario.service';
import { HttpResponse } from '@angular/common/http';
import { first } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  login: FormGroup;

  constructor(private fb:FormBuilder, private accountService: AccountService){
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }


  loginUsuario(): void {
    console.log(this.login);
  
      const usuario: Usuario = {
        email: this.login.value.email,
        password: this.login.value.password
      }
  

      this.accountService.loginUser(usuario)
        .pipe(first())
        .subscribe((data: HttpResponse<any>) => {
          console.log(data);
          console.log(data.headers);
/*           console.log(data.headers.get);
 */      });
  
    }


  ngOnInit(): void {
  }

  log(): void {
    console.log(this.login);

    const usuario: Usuario = {
      email: this.login.value.email,
      password: this.login.value.password 
    }
    console.log(usuario);
  }  
}


