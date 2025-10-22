import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  Math = Math;

  userQuestion = '';
  answer = '';

  faqs = [
    {
      question: 'How do I start using Day X?',
      answer:
        'Getting started is quick! Simply create an account, and you can start adding your events, secrets, and emotions right away.',
      open: false,
    },
    {
      question: 'What types of entries can I save?',
      answer:
        'You can save text notes, your emotions and thoughts, photos, videos, and even attach dates and times for each entry.',
      open: false,
    },
    {
      question: 'Can I add more events or secrets later?',
      answer:
        'Absolutely! You can add new events, secrets, or memories anytime — Day X is designed to grow with you.',
      open: false,
    },
    {
      question: 'How do “Emotions from the Past” work?',
      answer:
        'Day X checks your past entries and reminds you of similar events or emotions from previous years, helping you reflect and learn from the past.',
      open: false,
    },
    {
      question: 'What are secret events and how do they work?',
      answer:
        'Secret events are hidden until a specific date and time. Until then, you’ll only see a lock icon. When the time comes, the event unlocks and reveals its content.',
      open: false,
    },
    {
      question: 'Can I schedule multiple secret events?',
      answer:
        'Yes! You can schedule as many secret events as you like, each with its own date, time, and content.',
      open: false,
    },
    {
      question: 'Are my entries private and secure?',
      answer:
        'Absolutely. All your entries and secret events are private and accessible only to you unless you choose to share them.',
      open: false,
    },
    {
      question: 'How do reminders work for events?',
      answer:
        'You can set reminders for any event. Day X will notify you ahead of time so you never miss important dates or surprises.',
      open: false,
    },
  ];

  toggle(faq: any) {
    faq.open = !faq.open;
  }
  ask() {
    this.answer = `Thanks for your question: "${this.userQuestion}". We'll get back to you soon!`;
    this.userQuestion = '';
  }
}
