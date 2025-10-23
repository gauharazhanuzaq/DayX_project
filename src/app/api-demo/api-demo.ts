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
  switchMap,
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
  usersCount = 0;
  errorMsg = '';
  searchSubject = new BehaviorSubject<string>('');
  limitSubject = new BehaviorSubject<number>(5);
  currentLimit = 5;

  constructor(private api: Api) { }

  ngOnInit() {
    this.users$ = combineLatest([
      this.limitSubject.pipe(
        switchMap((limit) =>
          this.api.getFeedback(limit).pipe(
            catchError((err) => {
              this.errorMsg = err.message;
              return of([]);
            })
          )
        )
      ),
      this.searchSubject.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
    ]).pipe(
      map(([users, term]) => {
        const filtered = users.filter(
          (u: any) =>
            u.name.toLowerCase().includes(term.toLowerCase()) ||
            u.comment.toLowerCase().includes(term.toLowerCase())
        );
        this.usersCount = filtered.length;
        return filtered;
      })
    );
  }
  changeLimit(newLimit: number) {
    this.currentLimit = newLimit;
    this.limitSubject.next(newLimit); 
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
// Задачи
// нужно убрать стрелочки если данные меньше 3, 
// также filter кнопка чтобы лимит динамически изменилась
