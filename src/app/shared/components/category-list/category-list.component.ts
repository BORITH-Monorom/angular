import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Category } from '../../../core/models/category.model';
import { API_ENDPOINTS } from '../../../core/models/api_endpoints';

import { Product } from '../../../core/models/product.model';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { sweetAlert2 } from '../../../core/services/sweetalert.utils';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
    selector: 'app-category-list',
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  private onDestroy = new Subject<void>();
  products:Product[] =[];
  categories:Category[] =[];
  productForm: FormGroup = new FormGroup({});
  value: string | undefined;
  currentProductId: string | null | undefined;  // Track current product ID

  // Pagination variables
  currentPage = 1;
  totalPage = 1;
  itemsPerPage = 10;  // Define how many products to display per page

  dataSource = new MatTableDataSource<Product>();
  displayedColumns:string[] = ['name', 'price', 'description','Action'];

  constructor(
    private ApiService: ApiService,
    private formBuilder: FormBuilder,
    private SweetAlert2: sweetAlert2
  ){}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],  // Name is required
      price: [0, [Validators.required, Validators.min(0)]],  // Price must be >= 0
      description: ['']
    });

    this.fetchProducts(this.currentPage);

    this.ApiService.create(API_ENDPOINTS.products, this.productForm.value)
    .pipe(takeUntil(this.onDestroy))
  .subscribe({
    next:(newProduct) => {
      this.products.push(newProduct);  // newProduct should have an id
      this.productForm.reset();
    },
    error:(error) => {
      console.error('Error adding product:', error);
    }
  });
  }

  applyFilter(event: Event):void{
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue;
    this.fetchProducts(this.currentPage, filterValue)
    console.log(this.fetchProducts(this.currentPage, filterValue),"filter");
  }

  // Fetch paginated products
  fetchProducts(page: number ,searchQuery: string = ''): void {
    this.ApiService.getAllPaginated(API_ENDPOINTS.products, page, this.itemsPerPage, searchQuery)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response) => {
        this.products = response.products.map((product: any) => ({...product, id: product._id}));
        this.dataSource.data = this.products;
        this.totalPage = Math.ceil(response.total / this.itemsPerPage);  // Calculate total pages
      });
  }

  // Pagination controls
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.fetchProducts(this.currentPage);
    }
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      if(this.currentProductId){
        this.ApiService.update(API_ENDPOINTS.products, this.currentProductId, this.productForm.value,).pipe(takeUntil(this.onDestroy)).subscribe({
          next: (updatedProduct) => {
            console.log(updatedProduct, "update");
            const index = this.products.findIndex((p)=> p.id === this.currentProductId);
            console.log(index, "index")
            if(index != -1){
              console.log(this.products[index], "productg index")
              this.products[index] = updatedProduct;
              this.dataSource.data = [...this.products];
            }
            this.productForm.reset();
            this.currentProductId = null;

            this.SweetAlert2.showSuccessAlert();
          },
          error:(error) =>{
            this.SweetAlert2.showErrorAlert();
            console.error('Error updating product:', error);
          }
        })
      }else
       // If `currentProductId` is not set, create a new product
      this.ApiService.create(API_ENDPOINTS.products, this.productForm.value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe({
         next: (newProduct) => {
            this.SweetAlert2.showSuccessAlert();
            this.products.push(newProduct);
            this.productForm.reset();
            this.dataSource.data = [...this.dataSource.data, newProduct]
          },
         error: (error) => {
            console.error('Error adding product:', error);
          }
    });
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
  onEditCancel(){
    this.productForm.reset();
    this.currentProductId = null;
  }


  onDelete(id: string | undefined): void {
    if (id) {  // Ensure id is defined
      this.SweetAlert2.showConfirmationDialog(
        'Are you sure you want to delete this product?',
        'Confirm Delete',
        'Delete',
      ).then((result) => {
        if(result.isConfirmed){
          this.deleteProduct(id);
        }
      })
    } else {
    console.error('Product ID is undefined.');// Show ocnfirmation prompt
  }


}
deleteProduct(id: string){
  this.ApiService.delete(API_ENDPOINTS.products, id)
  .pipe(takeUntil(this.onDestroy))
  .subscribe({
    next:() => {
      this.products = this.products.filter(p => p.id !== id);  // Remove the deleted product from the list
      this.dataSource.data = this.products;  // Update filtered products after deletion
      this.SweetAlert2.showSuccessAlert("Success","Product deleted successfully");
    },
    error:(error) => {
      this.SweetAlert2.showErrorAlert();
      console.error('Error deleting product:', error);
    },
    complete:() =>{
      console.log('Product deleted successfully');
    }
  });
}
  ngOnDestroy(): void {
    this.onDestroy.next();  // Emit a signal to complete the subscription
    this.onDestroy.complete();  // Complete the Subject
  }

}
