import { Component, ElementRef, ViewChild } from '@angular/core';
import { Problems } from '../models/app.models';

const Quotes: Problems[] = [
  {
    variant: 1,
    quote: '“Do. Or do not. There is no try.” — Yoda',
    problem: 'No value in searching field'
  },
  {
    variant: 2,
    quote: '“The dark side of the Force is a pathway to many abilities some consider to be unnatural.” — Chancellor Palpatine',
    problem: 'Same username'
  },
  {
    variant: 3,
    quote: '“I’m just a simple man trying to make my way in the universe.” — Jango Fett',
    problem: 'Something went wrong try again or call your admin'
  }
];

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  problemDetails: Problems;

  @ViewChild('myModal', {static: false}) modal: ElementRef;

  public open(variant: number): void {
    this.problemDetails = Quotes.find(target => variant === target.variant);
    this.modal.nativeElement.style.display = 'block';
  }

  public close(): void {
    this.modal.nativeElement.style.display = 'none';
  }
}
