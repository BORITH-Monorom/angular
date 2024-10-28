import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  arrayObj(items:any[], key:string):any{
    return items.filter(items => items[key]).length
  }

  nowDate(items:Date):string{
    const now = new Date();
    const createAt = new Date(items);
    const diffInMs = now.getTime() - createAt.getTime(); //Difference in milliseconds

    const diffInSeconds = Math.floor(diffInMs / 1000); // Convert to seconds
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Convert to minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours
    const diffInDays = Math.floor(diffInHours / 24); // Convert to days
    const diffInWeeks = Math.floor(diffInDays / 7); // Convert to weeks
    const diffInMonths = Math.floor(diffInDays / 30); // Convert to months
    const diffInYears = Math.floor(diffInDays / 365); // Convert to years

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} weeks ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    } else {
      return `${diffInYears} years ago`;
    }

  }
}
