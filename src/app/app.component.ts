import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from './footer/footer.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    NavComponent,
    FooterComponent,
    AdminOrdersComponent
  ]
})
export class AppComponent {
  title = 'skinsmask';
}
