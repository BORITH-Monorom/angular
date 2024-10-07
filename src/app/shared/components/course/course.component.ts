import { Component } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../../../core/models/product.model';
import { API_ENDPOINTS } from '../../../core/models/api_endpoints';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  products: Product[] = [];
  constructor(private apiService: ApiService){

    this.apiService.getAll(API_ENDPOINTS.products).subscribe(res =>{
      if(res){
        this.products = res.products;
      }
    })
  }
}
