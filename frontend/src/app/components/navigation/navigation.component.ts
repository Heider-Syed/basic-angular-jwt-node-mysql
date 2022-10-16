import { Component, OnInit } from '@angular/core';

//routing based on the jwt token
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';  


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  //inicialmente el usuario no esta autenticado
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //dependiendo de si el usuario está logueado o no esto permitirá la navegación de rutas
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) =>{
      this.isAuthenticated = isLoggedIn;
    })
  }

  //proporcionar al usuario la capacidad de cerrar sesión
  logoutUser(): void{
    localStorage.removeItem("token");
    //actualiza el estado de inicio de sesión en el servicio de autenticación después de eliminar el token
    this.authService.isUserLoggedIn$.next(false);
    
    //en caso de que el usuario no haya iniciado sesión, esto redirigirá al usuario al inicio de sesión
    this.router.navigate(["login"]);
  }

}