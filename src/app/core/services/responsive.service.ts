import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private readonly small = '(max-width: 768px)';
  private readonly medium = '(max-width: 992px)';
  private readonly large = '(max-width: 1200px)';

  breakpointObserver = inject(BreakpointObserver);
  
  screenWidth$ = this.breakpointObserver.observe([this.small, this.medium, this.large]);

  screenWidth = toSignal(this.screenWidth$); // convert rxjs to signal

  smallWidth = computed(() => this.screenWidth()?.breakpoints[this.small]);
  mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.medium]);
  largeWidth = computed(() => this.screenWidth()?.breakpoints[this.large]);


}


