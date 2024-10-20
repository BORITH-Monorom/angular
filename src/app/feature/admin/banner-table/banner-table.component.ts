import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
import { TruncateTextPipe } from '../../../_utils/pipes/truncate-text.pipe';
import { ApiService } from '../../../core/services/api.service';
import { Slide } from '../../../core/models/slide.model';
// import { TruncateTextPipe } from '../../../_utils/pipes/truncate-text.pipe';


@Component({
  selector: 'app-banner-table',
  standalone: true,
  imports: [MaterialModule,TruncateTextPipe],
  templateUrl: './banner-table.component.html',
  styleUrl: './banner-table.component.scss'
})
export class BannerTableComponent implements OnInit{
  constructor(private apiService: ApiService){}
  results: Slide[] = [];

  fileName: string = '';
  bannerName: string = '';
  selectedFile: File | null = null;
  ngOnInit(): void {
    this.fetchData();

  }
  onDelete(id:any):void{
    this.deleteBanner(id);
  }
  fetchData(){
    this.apiService.getSlide().subscribe({
      next: (response) =>{
        this.results = response;
        console.log(response);
      },
      error: (error) =>{
        console.error("Error fetching slides', Error");
      }
    })
  }
onFileSelected(event: any){
  const file:File = event.target.files[0];
  if(file){
    this.fileName = file.name;
    this.selectedFile = file; // Store the file for uploading later
  }
}
uploadBanner(){

  if(!this.selectedFile || !this.bannerName){
    console.log("File or name is missing");
    return;
  }

  //Prepare the form data
  const formData = new FormData();
  formData.append('title', this.bannerName);
  formData.append('file', this.selectedFile);

  //Call the API to upload the data
  this.apiService.postSlide(formData).subscribe({
    next: (response) =>{
      this.resetForm();
      this.results.push(response); // Add the new banner to the list immediately
      console.log("banner uploaded successfully,", response);
    },
    error: (error) =>{
      console.error("Error uploading banner', Error");
    }
  })
}
deleteBanner(id:any) {
  this.apiService.deleteSlide(id).subscribe({
  next: (res) =>{
    console.log(res, "delete Banner");
    this.results = this.results.filter(p => p._id !== id); // Remove the deleted banner from the list
  }
  })
}

resetForm(){
this.bannerName =''
this.fileName = '';
this.selectedFile=null;
}
}
