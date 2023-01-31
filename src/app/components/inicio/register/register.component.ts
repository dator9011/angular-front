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
  register: FormGroup;
  model: any;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.register = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: [''],
      birthday: ['',Validators.required],
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
      email: "test2@example.com",
      /* birthday: this.register.get('birthday')?.value.toISOString(), */
      birthday: this.formatDateToISO(this.register.value.birthday),
      phone: "55555555",
      gender: 0
    }

    this.accountService.saveUser(account).subscribe((data:any) => {
      console.log(data);
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
