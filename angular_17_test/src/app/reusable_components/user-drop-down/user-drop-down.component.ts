import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-drop-down',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Dropdown Content -->
    <div
      class=" absolute right-0 mt-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div class="py-1" role="none">
        <!-- User Name -->
        <div class="block px-4 py-2 text-xs text-gray-400">{{ userName }}</div>
        <!-- Logout Button -->
        <a
          (click)="logOut()"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          >Logout</a
        >
      </div>
    </div>
  `,
  styleUrl: './user-drop-down.component.css',
})
export class UserDropDownComponent {
  constructor(private authService: AuthService) {}
  @Input() userName: string | any;
  logOut() {
    this.authService.removeToken();
  }
}
