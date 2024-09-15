import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Category } from '../../../core/models/category.model';
import { API_ENDPOINTS } from '../../../core/models/api_endpoints';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { schemas, sharedModules } from '../../shared.module';
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [...sharedModules,HttpClientModule,CommonModule,ReactiveFormsModule],
  schemas: [...schemas],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  private onDestroy = new Subject<void>();
  products:Product[] =[];
  categories:Category[] =[];
  productForm: FormGroup = new FormGroup({});
  value: string | undefined;
  currentProductId: string | undefined;  // Track current product ID
  constructor(
    private ApiService: ApiService,
    private formBuilder: FormBuilder
  ){}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],  // Name is required
      price: [0, [Validators.required, Validators.min(0)]],  // Price must be >= 0
      description: ['']
    })

    this.ApiService.getAll(API_ENDPOINTS.products).pipe(takeUntil(this.onDestroy)).subscribe((data)=>{
      this.products = data;
      })

    this.ApiService.getAll(API_ENDPOINTS.categories).pipe(takeUntil(this.onDestroy)).subscribe((data)=>{
      this.categories = data;
    })
  }

  onSubmit(){
    if(this.productForm.valid){
      this.ApiService.create(API_ENDPOINTS.products,this.productForm.value).pipe(takeUntil(this.onDestroy)).subscribe((data)=>{
        this.products.push(data);
        this.productForm.reset();
      })
    }
  }

  onEdit(product: Product): void {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description
    });

    // Store the product's ID for update
    this.currentProductId = product.id;
  }


  ngOnDestroy(): void {
    this.onDestroy.next();  // Emit a signal to complete the subscription
    this.onDestroy.complete();  // Complete the Subject
  }
}
