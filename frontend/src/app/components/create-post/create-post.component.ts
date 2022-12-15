import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @ViewChild('formDirective') formDirective!: NgForm;
  form: FormGroup;
  constructor() {
    this.form = this.createFormGroup();
  }

  ngOnInit(): void {}

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  createPost(formData: Pick<Post, 'body' | 'title'>): void {
    console.log('create post form', this.form.value);
    this.form.reset();
    this.formDirective.resetForm();
  }
}
