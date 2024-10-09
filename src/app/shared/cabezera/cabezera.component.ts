import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, SUserData } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.css']
})

export class CabezeraComponent implements OnInit {


  constructor(
    private appService: AppService,
    private router: Router
  ) { 
  
  }
  showMenu = false;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.user-menu')) {
      this.showMenu = false;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  
  ngOnInit(): void {
    if (sessionStorage.getItem('userData')) {
      this.appService.userData = sessionStorage.getItem('userData') as SUserData;
    }else{
      this.router.navigate(['login']);
    }
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
