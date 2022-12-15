import { first } from 'rxjs';
import { PostService } from './../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @ViewChild('formDirective') formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  isOpen = false;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {
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

  createPost(formData: any): void {
    console.log('create post form', this.form.value);
    this.postService
      .createPost(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });

    this.form.reset();
    this.formDirective.resetForm();
  }
}
