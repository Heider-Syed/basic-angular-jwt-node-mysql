import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Posts } from 'src/app/models/posts.model';

import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  //hace posible restablecer el formulario sin recargar el componente
  @ViewChild("formDirective") formDirective!: NgForm;

  //hace posible mostrar la salida de la nueva publicación sin recargar el componente
  @Output() create: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;

  constructor(private authService: AuthService, private postService: PostsService) { }

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("",[Validators.required, Validators.minLength(5)]),
      body: new FormControl("",[Validators.required, Validators.minLength(5)]),
    })
  }

  onSubmit(formData: Pick<Posts, "title" | "body">): void {
    this.postService.createPost(formData).pipe(first()).subscribe(() => {
      this.create.emit(null);
    });

    //restablecer el formulario y la directiva de formulario
    this.form.reset();
    this.formDirective.resetForm();

  }

}
