import { Injectable } from '@angular/core';
import { Movies } from '../models/Movies';

@Injectable({
  providedIn: 'root',
})
export class MangSliderService {
  mangSlider: any[] = [
    {
      img: 'assets/img/rom.jpg',
      img_blur: 'assets/img/rom.jpg',
      trailer: 'https://www.youtube.com/embed/XRm1P7oGpMQ',
    },
    {
      img: 'assets/img/slider-13ReasonWhy.jpg',
      img_blur: 'assets/img/slider-13ReasonWhy-blur.jpg',
      trailer: 'https://www.youtube.com/watch?v=tOICXpsImEI',
    },
    {
      img: 'assets/img/slider-matbiec.jpg',
      img_blur: 'assets/img/slider-matbiec-blur.jpg',
      trailer: 'https://www.youtube.com/embed/ITlQ0oU7tDA',
    },
    {
      img: 'assets/img/slider-transform.jpg',
      img_blur: 'assets/img/slider-transform-blur.jpg',
      trailer: 'https://www.youtube.com/embed/_-cjO3KqJ_w',
    },
  ];
  constructor() {}
}
