import { Component, computed, effect, inject, resource, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { lastValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ApiServiceService } from '../../../../core/services/api-service.service';
@Component({
  // templateUrl: './contact-list.component.html',
  // styleUrl: './contact-list.component.scss'
  selector: 'app-contact-list',
  imports: [MatSnackBarModule,RouterLink,MatProgressSpinnerModule,MatFormFieldModule,MatListModule,MatIconModule,MatButtonModule,MatInputModule,FormsModule],
  template: `
  <div class="container mt-5">
    <div class="content">
      <div class="content__header">
        <span class="content__title">Contact List</span>
      </div>

    <div class="content__body">
    @if(contactsResource.error()){
      <div class="">
        <span class="error">Data Not found <mat-icon arial-hidden="false" fontIcon="error"></mat-icon></span>
      </div>
    }@else{
    <mat-list>
      @for(contact of contactsResource.value(); track contact.id){
        <mat-list-item>
          <h3 matListItemTitle>{{contact.name}}</h3>
          <p matListItemLine>{{contact.email}}</p>
          <div matListItemMeta>
            <button class="w-full" mat-icon-button routerLink="/editContact/{{contact.id}}">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button (click)="DeleteContact(contact.id)">
              <mat-icon >delete</mat-icon>
            </button>
          </div>
        </mat-list-item>
      }
    </mat-list>
    }
    </div>

    <div class="content__footer">
      <div class="grid grid-cols-[1fr_auto] gap-4">
        <button [disabled]="contactsResource.error()" class="w-full" mat-stroked-button routerLink="/addContact">Add Contact</button>
        <button routerLink="/"  class="" mat-icon-button><mat-icon fontIcon="home"></mat-icon></button>
      </div>
    </div>
  </div>
</div>

  @if(loading()){
    <mat-spinner></mat-spinner>
  }
  `,
  styles: `

  `
})
export class ContactListComponent {

  api = inject(ApiServiceService)
  snackbar = inject(MatSnackBar)
  loading = computed(() => this.contactsResource.isLoading() || this.deleting())
  deleting = signal(false)

  async DeleteContact(id:any){
    this.deleting.set(true)
    await lastValueFrom(this.api.deleteContact(id));
    this.deleting.set(false)
    this.snackbar.open("Successful Deleted", 'Undo', {
      duration: 3000
    })
    this.contactsResource.reload();
  }

  contactsResource = rxResource({
    stream:() => this.api.getContact()
  })

showError = effect(() =>{
  const error = this.contactsResource.error() as Error
    if(error){
      this.snackbar.open(error.message, 'Close', {
        duration: 3000
      })
    }

})

}
