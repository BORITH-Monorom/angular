import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Category } from '../../../core/models/category.model';
import { API_ENDPOINTS } from '../../../core/models/api_endpoints';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  private onDestroy = new Subject<void>();
  products:Product[] =[];
  categories:Category[] =[];
  productForm: FormGroup = new FormGroup({});
  value: string | undefined;
  currentProductId: string | null | undefined;  // Track current product ID
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


  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.currentProductId) {
        // If there is a currentProductId, update the product
        this.ApiService.update(API_ENDPOINTS.products, this.currentProductId, this.productForm.value)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(
            (updatedProduct) => {
              // Update the product in the list
              const index = this.products.findIndex(p => p.id === this.currentProductId);
              if (index !== -1) {
                this.products[index] = updatedProduct;
              }
              this.productForm.reset();
              this.currentProductId = null;  // Clear the current product
            },
            (error) => {
              console.error('Error updating product:', error);
            }
          );
      } else {
        // Otherwise, add a new product
        this.ApiService.create(API_ENDPOINTS.products, this.productForm.value)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(
            (newProduct) => {
              this.products.push(newProduct);
              this.productForm.reset();
            },
            (error) => {
              console.error('Error adding product:', error);
            }
          );
      }
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
