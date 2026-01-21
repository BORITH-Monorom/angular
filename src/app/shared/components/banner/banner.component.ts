import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {register} from 'swiper/element/bundle';
import { ApiService } from '../../../core/services/api.service';
import { MaterialModule } from '../../../module/material.module';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Store } from '@ngxs/store';
import { GetSlides, SlideState } from '../../../core/store/state/slide.state';
import { SwiperOptions } from 'swiper/types';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApiServiceService } from '../../../core/services/api-service.service';

register();
@Component({
    selector: 'app-banner',
    imports: [MaterialModule, CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent{
  ApiService = inject(ApiService)
  slidesResource = rxResource({
    stream: () => this.ApiService.getSlide()
  })


}
