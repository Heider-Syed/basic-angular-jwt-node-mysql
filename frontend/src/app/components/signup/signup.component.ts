import { Component, OnInit } from '@angular/core';

// librerias necearias para que los formularios funcionen
import { FormControl, FormGroup, Validators } from '@angular/forms';

// trae el servicio de autenticacion para que envie los datos al backend
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  //le dice a ts que el valor del formulario estará disponible durante la ejecución del programa para evitar errores de inicialización
  signupForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //le dice a ts que cree el grupo de formularios de registro cuando se inicia el componente
    this.signupForm = this.createFormGroup();
  }

  //especifica los datos que recibirá el formulario y los empareja con el grupo de formularios con alguna validación cuando se crea
  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl("",[Validators.required, Validators.minLength(2)]),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(7)]),
      passwordConfirm: new FormControl("",[Validators.required, Validators.minLength(7)])
    })
  }

  //realiza la función de registro del formulario de registro que viene del servicio de autenticacion
  signup(): void {
    this.authService.signup(this.signupForm.value).subscribe(
      (msg) =>{
        console.log(msg)
      }
    );
  }

}