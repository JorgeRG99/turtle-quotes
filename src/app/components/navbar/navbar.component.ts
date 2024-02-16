import { Component } from '@angular/core';
import { PageLogoComponent } from './components/page-logo/page-logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [PageLogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
