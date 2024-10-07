import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {

  }
}
