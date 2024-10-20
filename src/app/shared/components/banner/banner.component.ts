import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import {register} from 'swiper/element/bundle';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../../module/material.module';
import { Slide } from '../../../core/models/slide.model';
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types/swiper-options';
import Swiper from 'swiper';
register();
@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit{
  slides:Slide[]=[];
constructor(private apiService: ApiService){}
@ViewChild('bannerSwiper', { static: false }) bannerSwiper!: ElementRef;
  // Swiper options for the custom element
  swiperOptions: SwiperOptions = {
    slidesPerView: 7,
    slidesPerGroup: 1,
    spaceBetween: 0,

    preventClicks: true,
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    keyboard:{
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    observer: true,            // Ensures Swiper updates with DOM changes
    observeParents: true,
    breakpoints:{
      320:{
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768:{
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1024:{
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1440:{
        slidesPerView: 7,
        spaceBetween: 10,
      }

    }    // Updates Swiper if the parent DOM changes
  };

  ngOnInit(): void {
    this.apiService.getSlide().pipe().subscribe({
      next: (res) =>{
        this.slides = res;
      }
    })
  }

  ngAfterViewInit(): void {
    // Initialize Swiper manually after the view is rendered
    setTimeout(() =>{


    if (this.bannerSwiper && this.bannerSwiper.nativeElement) {
     const swiper = new Swiper(this.bannerSwiper.nativeElement, this.swiperOptions);

     //Manually starts autoplay
     if(swiper.autoplay){
      swiper.autoplay.start();
     }

     //Force Update in case of hidden elements
     swiper.update();
    }
  },300)
  }

}
