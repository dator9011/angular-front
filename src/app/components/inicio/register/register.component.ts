import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario, Account } from 'src/app/models/usuario';
import { AccountService } from 'src/app/services/usuario.service';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
/* import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common'; */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  [x: string]: any;
  loading: boolean = false;
  register: FormGroup;
  model: any;
  genderValue: any = ['Masculino', 'Femenino'];

  constructor(private fb: FormBuilder,
                       private accountService: AccountService,
                       private toastr: ToastrService,
                       private router: Router) {
    this.register = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: [''],
      birthday: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',Validators.required],
      gender: ['',Validators.required]
    }, {validator: this.checkPassword });
  }



  registrarUsuario(): void {
  console.log(this.register);
/* 
    const usuario: Usuario = {
      email: this.register.value.email,
      password: this.register.value.password
    }
 */
    const account: Account = {
      fullName: this.register.value.usuario,
      password: this.register.value.password,
      confirmationPassword: this.register.value.confirmPassword,
      email: this.register.value.email,
      birthday: this.formatDateToISO(this.register.value.birthday),
      phone: this.register.value.phone,
      gender: this.register.value.gender === 'Masculino' ? 0 : 1
    }

    if(this.register.status){
/*       this.accountService.saveUser(account).subscribe((data:any) => {
      console.log(data);
    }); */
    this.loading = true;
    this.accountService.saveUser(account)
    .pipe(first())
    .subscribe(
      (data => {
      console.log(data);
      //console.log(data.headers.get('authorization')?.slice(7));
      this.register.reset();
      this.loading = false;
      this.toastr.success("Registro satisfactorio","Usuario registrado");
      this.router.navigate (["/inicio/login"]);
    }),
      error => {
          console.log(error);
          
          this.toastr.error(error.error.errors[0], "Error")
          this.loading = false;
          this.register.reset()
    });  
  } else {
    this.toastr.error("Usuario o password incorrecto", "Error");
  }
    
  }

  changeGender(e: any) {
    this['gender']?.setValue(e.target.value, {
      onlySelf: true,
    });
  }


  formatDateToISO(dateElem: Date): string {
    let  d = new Date(dateElem);
    return d.toISOString();
  }

  checkPassword(group: FormGroup):any {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

}
