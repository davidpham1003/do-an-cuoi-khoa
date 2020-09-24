import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-phim-dang-chieu',
  templateUrl: './phim-dang-chieu.component.html',
  styleUrls: ['./phim-dang-chieu.component.scss'],
})
export class PhimDangChieuComponent implements OnInit, AfterViewInit {
  @Input() isTheme;
  @Input() phimDC;
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      }, 
      {
        breakpoint: 421,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      
    ],
  };
  trailer: string;
  isModal: boolean;
  getTrailer(value) {
    this.trailer = value;
  }
  closeModal() {
    this.trailer = '';
  }
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 2000,
  //   // autoplay:true,
  //   autoplaySpeed: 2000,
  //   autoplayTimeout: 5000,
  //   autoplayHoverPause: true,
  //   navText: [
  //     "<img src='../../../../../../assets/img/prev-nav.png'/>",
  //     "<img src='../../../../../../assets/img/next-nav.png'/>",
  //   ],
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     400: {
  //       items: 2,
  //     },
  //     740: {
  //       items: 3,
  //     },
  //     940: {
  //       items: 4,
  //     },
  //   },
  //   nav: false,
  // };

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
}
