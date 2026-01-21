import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
import { TruncateTextPipe } from '../../../_utils/pipes/truncate-text.pipe';
import { ApiService } from '../../../core/services/api.service';
import { Slide } from '../../../core/models/slide.model';
import { sweetAlert2 } from '../../../core/services/sweetalert.utils';
import { AddSlide, DeleteSlide, GetSlides, SlideState } from '../../../core/store/state/slide.state';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-banner-table',
    imports: [MaterialModule, TruncateTextPipe],
    templateUrl: './banner-table.component.html',
    styleUrl: './banner-table.component.scss'
})
export class BannerTableComponent implements OnInit{
  constructor(
    private SweetAlert2: sweetAlert2,
    private store: Store
  ){}
  results: Slide[] = [];
  results$ = this.store.select(SlideState.getSlideBanner)
  fileName: string = '';
  bannerName: string = '';
  selectedFile: File | null = null;
  ngOnInit(): void {
      this.store.dispatch(new GetSlides()) 
  }

  onDelete(id:any):void{
    if(id){
      this.SweetAlert2.showConfirmationDialog("Are you sure you want to delete","This delete will permanently delete the banner", "Delete").then(res =>{
        if(res.isConfirmed){
          this.store.dispatch(new DeleteSlide(id))
        }
      })
    }
  }

onFileSelected(event: any){
  const file:File = event.target.files[0];
  if(file){
    this.fileName = file.name;
    this.selectedFile = file; // Store the file for uploading later
  }
}
uploadBanner() {
  if (!this.selectedFile || !this.bannerName) {
    this.SweetAlert2.showErrorAlert("Error", "Please fill all the fields");
    return;
  }

  const formData = new FormData();
  formData.append('title', this.bannerName);
  formData.append('file', this.selectedFile);

  this.store.dispatch(new AddSlide(formData)).subscribe({
    next: () => {
      this.resetForm();
      this.SweetAlert2.showSuccessAlert("Success", "Banner uploaded successfully");
    },
    error: (error) => {
      const errorMessage = error?.error?.message;
      if (errorMessage === "File size exceed the 1MB limit.") {
        this.SweetAlert2.showErrorAlert("Error", "File size exceed the 1MB limit.");
      } else {
        this.SweetAlert2.showErrorAlert("Error", errorMessage || "An error occurred.");
        console.log("Upload error:", error);
      }
    }
  });
}


resetForm(){
this.bannerName =''
this.fileName = '';
this.selectedFile=null;
}
}
