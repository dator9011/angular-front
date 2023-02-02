import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { AccountService } from 'src/app/services/usuario.service';
//import { HttpResponse } from '@angular/common/http';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  login: FormGroup;

  constructor(private fb:FormBuilder, 
              private accountService: AccountService,
              private toastr: ToastrService,
              private router: Router){
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
  
      if (this.login.status) {
        this.login.reset();
        this.loading = true;
        this.accountService.loginUser(usuario)
        .pipe(first())
        .subscribe(
          (data => {
          console.log(data);
          console.log(data.headers.get('authorization')?.slice(7));
          this.loading = false;
          this.toastr.success("Login satisfactorio","Bienvenido");
          this.router.navigate (["/dashboard"]);
        }),
          error => {
          // TODO: Error message management per error classification 
          this.toastr.error(error.error.message, "Error")
          this.loading = false;
        });  
      } else {
        this.toastr.error("Usuario o password incorrecto", "Error");
        this.login.reset();
      }


  
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


