import { Injectable } from '@angular/core';

import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  //este archivo se encarga de manejar los errores especificando el tipo de operación para decir donde fallo y por que
  handleError<T>(operation = "operation", result?: T){
    return (error: any): Observable<T> =>{
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}