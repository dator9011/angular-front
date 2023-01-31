import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario, Account } from 'src/app/models/usuario';
import { AccountService } from 'src/app/services/usuario.service';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  [x: string]: any;
  register: FormGroup;
  model: any;
  genderValue: any = ['Masculino', 'Femenino'];

  constructor(private fb: FormBuilder, private accountService: AccountService) {
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

    const usuario: Usuario = {
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password
    }

    const account: Account = {
      fullName: this.register.value.usuario,
      password: this.register.value.password,
      confirmationPassword: this.register.value.confirmPassword,
      email: this.register.value.email,
      birthday: this.formatDateToISO(this.register.value.birthday),
      phone: this.register.value.phone,
      gender: this.register.value.gender === 'Masculino' ? 0 : 1
    }

    this.accountService.saveUser(account).subscribe((data:any) => {
      console.log(data);
    });

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
