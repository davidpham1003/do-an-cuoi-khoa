import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { UserService } from 'src/app/core/Servers/user.service';
import { CommentService } from '../../../core/Servers/comment.service';
declare var $: any;

@Component({
  selector: 'app-chi-tiet-rate',
  templateUrl: './chi-tiet-rate.component.html',
  styleUrls: ['./chi-tiet-rate.component.scss'],
})
export class ChiTietRateComponent implements OnInit {
  @ViewChild('close') closeModal: ElementRef;
  @Input() isTheme:boolean;
  @Input() tenPhim:string;
  public formComment: FormGroup;
  mangComment: any[];
  currentUser: any = {};
  mangContent: any[] = []; // sử dụng ngfor và hiển thị giao diện
  trangThai: boolean = false;
  star: number = 0; // số sao đánh giá
  url: any; // Ảnh avatar comment
  count: number = 1; 
  constructor(
    private comment: CommentService,
    private auth: AuthenticationService,
    private user: UserService,
  ) {
    this.formComment = new FormGroup({
      binhLuan: new FormControl(null, Validators.required),
    });
  }
  Comment(value) {
    this.formComment.markAllAsTouched();
    if (this.formComment.invalid || this.star == 0) {
      return;
    } // Nếu chưa bình luận và đánh giá ==> không submit được
    const mangPush = {
      binhLuan: value.binhLuan,
      heart:0,
      danhGia: this.star,
      taiKhoan: this.currentUser.taiKhoan,
    }
    this.comment.createComment(this.tenPhim,mangPush)
    this.mangComment = [
      {
        binhLuan: value.binhLuan,
        danhGia: this.star,
        taiKhoan: this.currentUser.taiKhoan,
        heart:0,
      },
      ...this.mangComment,
    ];// push value lên đầu của mảng comment
    this.mangContent = this.mangComment.slice(0, 5 * this.count);// Mảng content để hiển thị giao diện = 5 giá trị đầu tiên của mảng comment
    localStorage.setItem('comment', JSON.stringify(this.mangComment));
    $('input[name="rating"]').prop('checked', false); // Reset Rating khi Submit thành công
    this.star = 0; // Reset Đánh giá về 0
    this.formComment.reset(); // Reset Value Form
    this.closeModal.nativeElement.click(); // Tắt modal
  }

  showMore() {
    // button show
    this.count++;
    this.mangContent = this.mangComment.slice(0, 5 * this.count);
    // Mỗi lần click mảng content sẽ +5 giá trị của mảng comment
  }
  hideee() {
    // reset lại giá trị ban đầu của mảng content
    this.count = 1;
    this.mangContent = this.mangComment.slice(0, 5 * this.count);
  }
  setStar(value) {
    this.star = value;
  }
  ngOnInit(): void {
    this.auth.currentUser.subscribe({
      next: (result) => {
        this.currentUser = result;
      },
    });

    // this.comment.getPolicies(this.tenPhim)
    this.comment.getPolicies(this.tenPhim).subscribe((data)=>{
      this.mangComment = [];
     data.forEach(e=>{
       this.mangComment.push(e.payload.doc.data());
       this.mangContent = this.mangComment.slice(0, 5 * this.count);
     })
    })
    


    // mảng content ban đầu
  }
}
