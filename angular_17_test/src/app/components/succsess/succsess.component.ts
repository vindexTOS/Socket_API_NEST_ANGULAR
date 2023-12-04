import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-succsess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './succsess.component.html',
  styleUrl: './succsess.component.css',
})
export class SuccsessComponent {
  @Input() succsessMessage: string = '';
}
