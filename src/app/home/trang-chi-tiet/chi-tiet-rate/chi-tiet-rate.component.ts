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
  @Input() isTheme;
  public formComment: FormGroup;
  mangComment: any[];
  close: boolean = true;
  currentUser: any = {};
  mangContent: any[] = [];
  trangThai: boolean = false;
  star: number = 0;
  rate: boolean;
  url: any;
  count: number = 1;
  constructor(
    public comment: CommentService,
    private auth: AuthenticationService,
    private router: Router,
    private user: UserService
  ) {
    this.formComment = new FormGroup({
      binhLuan: new FormControl(null, Validators.required),
    });
  }
  Comment(value) {
    this.formComment.markAllAsTouched();
    if (this.star == 0) {
      this.rate = true;
    }
    if (this.formComment.invalid || this.star == 0) {
      return;
    }

    this.mangComment = [
      {
        binhLuan: value.binhLuan,
        danhGia: this.star,
        taiKhoan: this.currentUser.taiKhoan,
        trangThai: this.trangThai,
        img: this.url ? this.url.img : null,
        heart:0,
      },
      ...this.mangComment,
    ];
    this.mangContent = this.mangComment.slice(0, 5 * this.count);
    localStorage.setItem('comment', JSON.stringify(this.mangComment));
    $('input[name="rating"]').prop('checked', false); // Reset Rating khi Submit thành công
    this.star = 0; // Reset Đánh giá về 0
    this.formComment.reset(); // Reset Value Form
    this.closeModal.nativeElement.click();
  }
  thaTim(value) {
    this.mangContent.forEach((commentItem) => {
      if (this.currentUser.taiKhoan) {
        if (value == commentItem.taiKhoan) {
          if (!commentItem.trangThai) {
            commentItem.trangThai = true;
            commentItem.heart += 1;
          } else {
            commentItem.trangThai = false;
            commentItem.heart -= 1;
          }
        }
      }else{
        commentItem.trangThai = false;
      }
    });

    localStorage.setItem('comment', JSON.stringify(this.mangContent));
    console.log(value, this.mangContent);
  }
  showMore() {
    this.count++;
    this.mangContent = this.mangComment.slice(0, 5 * this.count);
  }
  hideee() {
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
    this.user.avatarUser.subscribe({
      next: (data) => {
        this.url = data;

        let comment_local = JSON.parse(localStorage.getItem('comment'));
        if (comment_local) {
          if (this.url) {
            comment_local.forEach((commentItem) => {
              if (commentItem.taiKhoan == this.url.taiKhoan) {
                commentItem.img = this.url.img;
              }
            });
            localStorage.setItem('comment', JSON.stringify(comment_local));
          }
          this.mangComment = comment_local;
        } else {
          this.mangComment = this.comment.mangComment;
        }
      },
    });

    this.mangContent = this.mangComment.slice(0, 5 * this.count);
  }
}
