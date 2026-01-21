import { signal } from "@angular/core";

export const selectedCompetencies = signal<number[]>([]);

export function  isChecked(name: number): boolean {
    const result = selectedCompetencies().includes(name);
  return result
  }

export function toggleSelection(item: any): void {
    const current = selectedCompetencies();
    if (current.includes(item)) {
      selectedCompetencies.set(current.filter((c) =>{c !== item} ));
    } else if (current.length < 5) {
      selectedCompetencies.set([...current, item]);
    }
  }

