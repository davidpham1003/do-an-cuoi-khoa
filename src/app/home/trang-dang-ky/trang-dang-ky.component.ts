import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';

@Component({
  selector: 'app-trang-dang-ky',
  templateUrl: './trang-dang-ky.component.html',
  styleUrls: ['./trang-dang-ky.component.scss'],
})
export class TrangDangKyComponent implements OnInit {
  public formDangKy: FormGroup;
  loading: boolean = false;
  errors: any = {};
  checkDirtyForm() {
    return this.formDangKy.dirty;
  }
  DangKy(val) {
    this.formDangKy.markAllAsTouched();
    console.log(this.formDangKy.dirty)
    if (this.formDangKy.invalid) {
      return;
    }
    this.loading = true;
    this.errors = [];
    this.auth.dangKy(val).subscribe({
      error: (err) => {
        this.errors = err;
        this.loading = false;
        console.log(this.errors)
      },
      complete: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
    });
    console.log(val);
  }
  constructor(private auth: AuthenticationService, private router: Router) {
    this.formDangKy = new FormGroup({
      taiKhoan: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      matKhau: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      hoTen: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$'
        ),
      ]),
      soDt: new FormControl(),
    });
  }

  ngOnInit(): void {}
}
