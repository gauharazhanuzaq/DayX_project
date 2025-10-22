import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  catchError,
  startWith,
} from 'rxjs/operators';
import { Api } from '../services/api';

@Component({
  selector: 'app-api-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api-demo.html',
  styleUrl: './api-demo.css',
})
export class ApiDemoComponent implements OnInit {
  users$ = of<any[]>([]);
  errorMsg = '';
  searchSubject = new BehaviorSubject<string>('');

  constructor(private api: Api) { }

  ngOnInit() {
    const users$ = this.api.getFeedback(5).pipe(
      catchError((err) => {
        this.errorMsg = err.message;
        return of([]);
      })
    );

    this.users$ = combineLatest([
      users$,
      this.searchSubject.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
    ]).pipe(
      map(([users, term]) =>
        users.filter((u: any) =>
          u.name.toLowerCase().includes(term.toLowerCase()) ||
          u.comment.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }
  scrollLeft(container: HTMLElement) {
    container.scrollBy({ left: -320, behavior: 'smooth' });
  }

  scrollRight(container: HTMLElement) {
    container.scrollBy({ left: 320, behavior: 'smooth' });
  }

}
