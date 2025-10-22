import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-story.html',
  styleUrl: './my-story.css',
})
export class MyStory {
  story = {
    title: 'Our story',
    paragraphs: [
      `We came together because we believe smart choices today lead to a calmer, more secure tomorrow. We want to inspire a new generation to be patient, mindful, and create real value for themselves.`,
      `Day X is a movement for young people who don’t panic during dips, don’t chase trends, and know that time is their greatest ally in reaching their goals.`,
      `Join us on Day X and be part of this movement.`,
    ],
    signature: 'Gauhara',
    image: 'IMG_2277.HEIC', 
  };
}
