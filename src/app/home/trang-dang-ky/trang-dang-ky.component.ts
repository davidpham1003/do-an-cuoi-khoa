import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { PatternService } from 'src/app/core/Servers/pattern.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trang-dang-ky',
  templateUrl: './trang-dang-ky.component.html',
  styleUrls: ['./trang-dang-ky.component.scss'],
})
export class TrangDangKyComponent implements OnInit {
  public formDangKy: FormGroup;
  loading: boolean = false;
  errors: any = {};
  isShowPass: boolean = false;
  checkDirtyForm() {
    return this.formDangKy.dirty;
  }
  DangKy(val) {
    this.formDangKy.markAllAsTouched();
    console.log(this.formDangKy.dirty);
    if (this.formDangKy.invalid) {
      return;
    }
    this.loading = true;
    this.errors = [];
    this.auth.dangKy(val).subscribe({
      next: () => {
        this.loading = true;
        Swal.fire('', 'Đăng ký thành công', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        this.errors = err;
        this.loading = false;
        console.log(this.errors);
      },
      complete: () => {},
    });
    console.log(val);
  }
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private pattern: PatternService
  ) {
    this.formDangKy = new FormGroup({
      taiKhoan: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.pattern.Pattern.taiKhoan),
      ]),
      matKhau: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      hoTen: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.pattern.Pattern.email),
      ]),
      soDt: new FormControl(
        null,
        Validators.pattern(this.pattern.Pattern.soDt)
      ),
    });
  }

  ngOnInit(): void {}
}
