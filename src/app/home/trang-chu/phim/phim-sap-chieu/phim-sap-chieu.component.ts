import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-phim-sap-chieu',
  templateUrl: './phim-sap-chieu.component.html',
  styleUrls: ['./phim-sap-chieu.component.scss'],
})
export class PhimSapChieuComponent implements OnInit {
  @Input() isTheme;
  @Input() phimSC;
  trailer: string;
  isModal: boolean;
  getTrailer(value) {
    this.trailer = value;
  }
  closeModal() {
    this.trailer = '';
  }
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
  constructor() {}

  ngOnInit(): void {
    
  }
}
