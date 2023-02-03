import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ChangePasswordData } from 'src/app/models/usuario';
import { AccountService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  [x: string]: any;
  loading: boolean = false;
  changePassword: FormGroup;
  model: any;


  constructor(private fb: FormBuilder,
                       private accountService: AccountService,
                       private toastr: ToastrService,
                       private router: Router) {
    this.changePassword = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: [''],
    }, {validator: this.checkPassword });
  }

  changePass(): void {
    console.log(this.changePassword);

    const changePasswordInfo: ChangePasswordData = {
        oldPassword: this.changePassword.value.oldPassword,
        newPassword: this.changePassword.value.newPassword,
        confirmPassword: this.changePassword.value.confirmPassword
    }
  
    if(this.changePassword.status){
      this.loading = true;
      this.accountService.changePassword(changePasswordInfo)
      .pipe(first())
      .subscribe(
        (data => {
        console.log(data);
        //console.log(data.headers.get('authorization')?.slice(7));
        this.changePassword.reset();
        this.loading = false;
        this.toastr.success("Contraseña actualizada","Cambio satisfactorio");
        this.router.navigate (['/dashboard']);
      }),
        error => {
            console.log(error);
            
            this.toastr.error(error.error.message, "Error")
            this.loading = false;
            this.changePassword.reset()
      });  
    } else {
      this.toastr.error("Datos incorrectos", "Error");
    }
      
    }
  

    checkPassword(group: FormGroup):any {
      const pass = group.controls['newPassword'].value;
      const confirmPass = group.controls['confirmPassword'].value;
      return pass === confirmPass ? null : { notSame: true };
    }
}
