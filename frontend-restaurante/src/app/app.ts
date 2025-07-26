import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      { label: 'Cardápio', icon: 'pi pi-fw pi-book', routerLink: ['/pratos'] },
      { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: ['/clientes'] },
    ];
  }
}