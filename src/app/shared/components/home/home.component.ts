import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
import { ApiService } from '../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../core/models/api_endpoints';
import { Product } from '../../../core/models/product.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  loading = true;
  loadingConfig = {
    backdropBorderRadius: '4px',
    primaryColour: '#ff0000',
    secondaryColour: '#00ff00',
    tertiaryColour: '#0000ff'
  }
  products: Product[] = [];
  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.apiService.getAll(API_ENDPOINTS.products).subscribe(res =>{
      if(res){
        this.loading = false;
        this.products = res.products;
      }
    })
  }
;


}
