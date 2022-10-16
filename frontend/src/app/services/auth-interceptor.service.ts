import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

//permite request asincronas
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  //este archivo se encarga de enviar el token jwt al servidor para permitir que el servidor lo verifique y luego envíe el estado de autenticación
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //obtiene el token del localstorage
      const token = localStorage.getItem("token");
      if(token){
        ////si hay un token, adjuntamos el encabezado y el portador al token para que el middleware de autenticación pueda funcionar y extraer el payload
        const clonedRequest = req.clone({headers: req.headers.set("x-access-token", token),});
        //regresa la respuesta del servidor
        return next.handle(clonedRequest);
      }else{
        
        // maneja el error proveniente del servidor si no hay token, cierra la sesión .etc
        return next.handle(req);
      }

  }
}