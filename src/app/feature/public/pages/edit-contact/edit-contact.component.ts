import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiServiceService } from '../../../../core/services/api-service.service';

@Component({
  selector: 'app-edit-contact',
  imports: [MatProgressSpinnerModule, MatSnackBarModule,RouterLink, MatFormFieldModule,MatListModule,MatIconModule,MatButtonModule,MatInputModule,FormsModule,FormsModule],
  // templateUrl: './edit-contact.component.html',
  // styleUrl: './edit-contact.component.scss'
  template: `
  <div class="container mt-5">
  <div class="content">
      <span class="content__title">Edit Contact</span>
  </div>
    <div class="grid sm:grid-cols-2 grid-cols-1 gap-5">
      <mat-form-field class="example-full-width">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="name">
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <mat-label>Phone</mat-label>
        <input matInput [(ngModel)]="phone">
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="email">
      </mat-form-field>
      <div class="grid grid-cols-2 gap-4">
        <button mat-flat-button (click)="onSave()">Save</button>
        <button mat-stroked-button routerLink="/crud">Cancel</button>
      </div>
    </div>
   </div>
   @if(loading()){
        <mat-spinner></mat-spinner>
   }
  `,
  styles: ``
})
export class EditContactComponent {
router = inject(Router)
api = inject(ApiServiceService)
id = input.required<string>()

name = linkedSignal(() => this.contactResource.value()?.name ?? '');
phone = linkedSignal(() => this.contactResource.value()?.phone) ?? '';
email = linkedSignal(() => this.contactResource.value()?.email) ?? '';

saving = signal(false);

loading = computed(() => this.contactResource.isLoading() || this.saving())

async onSave(){
  this.saving.set(true)
await lastValueFrom(this.api.updateContent({
  id: this.id(),
  name: this.name(),
  phone: this.phone(),
  email: this.email()
}))
this.saving.set(false)
console.log(this.name(), this.phone(), this.email(), "edit result")
this.router.navigate(['/crud'])
}

contactResource = rxResource({
  params: this.id,
  stream: ({ params: id}) => this.api.getContactId(id)
})


}
