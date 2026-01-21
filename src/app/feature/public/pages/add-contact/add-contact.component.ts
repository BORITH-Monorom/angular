import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { lastValueFrom } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ApiServiceService } from '../../../../core/services/api-service.service';
@Component({
  selector: 'app-add-contact',
  imports: [MatSnackBarModule,RouterLink, MatFormFieldModule,MatListModule,MatIconModule,MatButtonModule,MatInputModule,FormsModule,FormsModule],
  // templateUrl: './add-contact.component.html',
  template:`
  <div class="container mt-5">
  <div class=content>
    <span class="content__title">Add Contact</span>
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
  `,
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {
api = inject(ApiServiceService)
route = inject(Router)

name = signal('')
phone = signal('')
email = signal('')

saving = signal(false)


async onSave(){
  this.saving.set(true)

    // Fetch current contacts to determine the next id
  const contacts = await lastValueFrom(this.api.getContact());
  const maxId = contacts.length > 0 ? Math.max(...contacts.map(c => +c.id)) : 0;
  const newId = maxId + 1;

  await lastValueFrom(this.api.addContact({
    id: String(newId),
    name: this.name(),
    phone: this.phone(),
    email: this.email()
  }))
  this.saving.set(false)
  this.route.navigate(['/crud'])
}
}
