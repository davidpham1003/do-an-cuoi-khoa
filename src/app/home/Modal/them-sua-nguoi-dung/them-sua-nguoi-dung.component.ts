import { error } from '@angular/compiler/src/util';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { PatternService } from 'src/app/core/Servers/pattern.service';
import { UserService } from 'src/app/core/Servers/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-them-sua-nguoi-dung',
  templateUrl: './them-sua-nguoi-dung.component.html',
  styleUrls: ['./them-sua-nguoi-dung.component.scss'],
})
export class ThemSuaNguoiDungComponent implements OnInit, OnChanges {
  public formUser: FormGroup;
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() methodUser: string;
  @Input() objectSuaUser: any;
  @Output() updateUser = new EventEmitter();
  isShowPass: boolean = false;
  isThemNguoiDung: boolean;
  button: string = '';
  header: string;
  sweetAlert(text: string, value: string, method: string) {
    // text = 'Thêm' hoặc 'cập nhật' , value = 'tên tài khoản', method ='success' hoặc 'error'
    if (method == 'success') {
      Swal.fire({
        title: `${text}`,
        text: `${text} ${value} thành công`,
        icon: 'success',
      }).then((data) => {
        if (text == 'Thêm Người Dùng') {
          Swal.fire({
            title: `Thêm Người Dùng`,
            text: `Bạn có muốn tiếp tục thêm người dùng.`,
            icon: 'question',
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK!',
            cancelButtonText: 'Hủy',
          }).then((result) => {
            if (!result.isConfirmed) {
              this.btnClose.nativeElement.click();
            }
            this.formUser.reset();
          });
        } else {
          // Cập nhật người dùng
          if (data.isConfirmed) {
            // đóng modal khi click ok
            this.btnClose.nativeElement.click();
          }
        }
      });
    } else if (method == 'error') {
      Swal.fire({
        title: `${text}  không thành công`,
        text: `${value}`,
        icon: 'warning',
      });
    }
  }

  constructor(
    private user: UserService, 
    private auth: AuthenticationService,
    private pattern: PatternService // Pattern service
  ) {
    this.formUser = new FormGroup({
      taiKhoan: new FormControl({ value: '' }, [
        Validators.required,
        Validators.pattern(this.pattern.Pattern.taiKhoan),
      ]),
      matKhau: new FormControl(null, Validators.required),
      hoTen: new FormControl(null, Validators.required),
      soDt: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          this.pattern.Pattern.email
        ),
      ]),
      maLoaiNguoiDung: new FormControl(null, Validators.required),
    });
  }
  updateNguoiDung() {
        // Cập nhật lại table khi thêm và cập nhật người dùng thành công
    this.updateUser.emit();
  }

  addUser(value) {
    // value = formUser.value
    this.formUser.markAllAsTouched(); 
    if (this.formUser.invalid) {
      return;
    }
    if (this.objectSuaUser) { 
      // Nếu giá trị truyền là ojectSuaUser có giá trị thì ==> cập nhật người dùng
      const updateUser = { ...value, maNhom: 'GP05' };
      this.auth.capNhat(updateUser).subscribe({
        // Cập nhật nguời dùng
        next: () => {
          this.sweetAlert('Cập Nhật', value.taiKhoan, 'success');
          this.updateNguoiDung();
        },
        error: (err) => {
          this.sweetAlert('Cập Nhật', err.error, 'error');
        },
      });
    } else {
      this.user.themUser(value).subscribe({
        next: () => {
          this.sweetAlert('Thêm Người Dùng', value.taiKhoan, 'success');
          this.updateNguoiDung();
          this.formUser.reset();
        },
        error: (err) => {
          this.sweetAlert('Thêm', err.error, 'error');
        },
      });
    }
  }
  ngOnChanges() {
    if (this.objectSuaUser) {
      this.formUser.setValue({
        //set giá trị cho input
        taiKhoan: this.objectSuaUser.taiKhoan,
        matKhau: this.objectSuaUser.matKhau,
        hoTen: this.objectSuaUser.hoTen,
        email: this.objectSuaUser.email,
        maLoaiNguoiDung: this.objectSuaUser.maLoaiNguoiDung,
        soDt: this.objectSuaUser.soDt,
      });
      this.formUser.controls['taiKhoan'].disabled;
      this.isThemNguoiDung = false;
      this.button = 'Cập Nhật'; // Tiêu đề nút button
      this.header = 'Cập Nhật Người Dùng'; // Tiêu đề của modal Header
    } else {
      this.formUser.reset();
      this.formUser.patchValue({
        maLoaiNguoiDung : 'KhachHang', //Set giá trị ban đầu là khách hàng
      })
      this.isThemNguoiDung = true;
      this.button = 'Thêm Người Dùng';
      this.header = 'Thêm Người Dùng';
    }
  }
  ngOnInit(): void {}
}
