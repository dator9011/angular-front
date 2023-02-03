import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/usuario.service';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private router: Router, private accountService: AccountService, private toastr: ToastrService){
  }

  ngOnInit(): void {} 

  logOut(): void{
    this.accountService.logOut().pipe(first())
    .subscribe(
      (data => {
      console.log(data);
      //console.log(data.headers.get('authorization')?.slice(7));
      this.accountService.removeLocalStorage();
      this.router.navigate(['/inicio/login']);
      this.toastr.success("El usuario fue deslogueado","Deslogueado");
    }),
      error => {
      this.toastr.error(error.error.message, "Error")
    }); 

  
  }
}
