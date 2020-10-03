import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  mangComment: any[] = [
    {
      img:
        'https://scontent.fsgn2-1.fna.fbcdn.net/v/t31.0-8/p720x720/665027_291145867671483_2087583256_o.jpg?_nc_cat=107&_nc_sid=210fed&_nc_ohc=4d2H01WIHh4AX9wpdDD&_nc_ht=scontent.fsgn2-1.fna&tp=6&oh=f5d6de43cc244c4e500d9dc1b52ff805&oe=5F819096',
      binhLuan: 'Phim Coi Tạm Được',
      taiKhoan: 'Thái Tài',
      danhGia: 7,
      trangThai: false,
      heart: 5,
    },
    {
      img:
        'https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.0-9/38071748_1233486476791415_7106637640274804736_n.jpg?_nc_cat=104&_nc_sid=7aed08&_nc_ohc=rTphKolorakAX-uJ4oe&_nc_ht=scontent.fsgn2-5.fna&oh=f705398ee6091b1080b2b2bf7a2625f3&oe=5F7EF3CF',
      binhLuan: 'Vai phản diện đẹp trai ngầu lòi luôn',
      taiKhoan: 'Hà Văn Tâm',
      danhGia: 8,
      trangThai: false,
      heart: 8,
    },
    {
      img:
        'https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.0-9/117755515_336869080786304_5249402674488324403_n.jpg?_nc_cat=102&_nc_sid=dd9801&_nc_ohc=kuT_lZN7YLgAX9oppqu&_nc_ht=scontent.fsgn2-5.fna&oh=9346fbf1042feb897f50d0b61d1148c1&oe=5F80D0ED',
      binhLuan:
        'Giải trí 10 là 10 thế nào gọi là ko thoả mãn mắc mệt.. xem giải trí thế là ok rồi',
      taiKhoan: 'Mỹ Tiên',
      danhGia: 10,
      trangThai: false,
      heart: 10,
    },
    {
      img:
        'https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.0-9/65945976_1085635124972888_8450766317190905856_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=FQ6KXn66ATkAX8axEYo&_nc_ht=scontent.fsgn2-6.fna&oh=a49f4d57a28ead9567db63cba6399fed&oe=5F7F5BB1',
      binhLuan:
        'Các cảnh đánh đấm mà đầu tư thêm nhiều pha đẹp mắt nữa thì hay hơn',
      taiKhoan: 'Thùy Dương',
      danhGia: 8,
      trangThai: false,
      heart: 3,
    },
  ];
  constructor() {}
}
