import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  standalone: true,
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  ngOnInit() {
    const myObservable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      },2000);
    });

    // const myObserver = {
    //   next: (value: any) => console.log(`Value: ${value}`),
    //   error: (err: any) => console.error(`Error: ${err}`),
    //   complete: () => console.log('Complete')
    // };

    // myObservable.subscribe(myObserver);
console.log("just before susbscribe");
    myObservable.subscribe({
      next:(x:any)=>{
        console.log(x);
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("complete");
      }
    });
    console.log("just after susbscribe");
  }
}
