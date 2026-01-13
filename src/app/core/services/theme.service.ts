
import { effect, inject, Injectable, signal, DOCUMENT } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<Theme>(this.getStoredTheme()); // Load theme from localStorage
  private _document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      if (this.theme() === 'dark') {
        this._document.documentElement.classList.add('dark');
      } else {
        this._document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme() {
    this.theme.update((value) => {
      const newTheme = value === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save theme to localStorage
      return newTheme;
    });
  }

  private getStoredTheme(): Theme {
    return (localStorage.getItem('theme') as Theme) || 'light';
  }
}
