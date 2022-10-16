import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//permite hacer pedidos http en formato json
import { HttpClient,HttpHeaders } from '@angular/common/http';

// importa las cosas necesarias para permitir enviar y recibir datos al servidor con rxjs
import {BehaviorSubject, Observable} from "rxjs";

//permite atrapar las respuestas y errores que vienen del servidor
import { first, catchError, tap } from "rxjs/operators";


//llama el modelo de usuario
import { User } from "../models/user.model";

//llama el servicio que se creo para manejar los errores
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //ruta a la que contactara el frontend con el servidor
  private AUTH_API_URL ="http://localhost:3000/api/auth";

  //revisa si el usuario esta logeado, por defecto esto es falso
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: User["id"];

   //permite obtener de regreso los headers de la respuesta del servidor en formato json
  httpOptions: {headers: HttpHeaders} ={
    //crea un nuevo header http al instanciar el objeto, se quere el tipo de contenido de application/json 
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }

  //establece el cliente http y el servicio de manejo de errores dentro del constructor
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  //cree la función que enviará los datos al backend omitiendo la identificación del usuario y conviértala en un observable del modelo de usuario
  signup(user: Omit<User, "id">): Observable<User> {

    /*pasa el objeto json con los datos del usuario, envía y reciba los encabezados http y luego use una tubería para combinar múltiples funciones en una sola función*/
    return this.http.post<User>(`${this.AUTH_API_URL}/signup`, user, this.httpOptions).pipe(
      //first hace que no nos demos de baja de este observable y devuelve la primera respuesta de error
      first(),
      //maneja los errores relacionados con el registro del usuario
      catchError(this.errorHandlerService.handleError<User>("signup"))
    )
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{token:string; userId: User["id"]}> {
    return this.http.post<any>(`${this.AUTH_API_URL}/login`, {email, password}, this.httpOptions).pipe(
      first(),
      tap((tokenObject: {token:string; userId:number}) =>{
        this.userId = tokenObject.userId;
        localStorage.setItem("token", tokenObject.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(["posts"]);
      }),
      catchError(this.errorHandlerService.handleError<{token:string; userId: any}>("login"))
    );
  }

}
