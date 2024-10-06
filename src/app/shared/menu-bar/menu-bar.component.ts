import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  menuItems = [
    { label: 'Bandeja', link: '/mae/bandeja' ,icon: 'bi bi-envelope'},
    { label: 'Crear Correspondencia', link: '/mae/correspondencias' ,icon: 'bi bi-envelope', badge: 169 },
    { label: 'Control de Correspondencia', link: '/mae/control' ,icon: 'bi bi-envelope' },
    // { label: 'Home', link: '/mae/bandeja' ,icon: 'bi bi-envelope', badge: 169 },
    // { label: 'Esto a donde', link: '/mae/inicio', icon: 'bi bi-file-earmark-plus' },
    // { label: 'Control de Correspondencia', link: '/mae/bandeja-principal', icon: 'bi bi-file-earmark-text' },
    // { label: 'Contact', link: '/contact', icon: 'bi bi-telephone' },
    // { label: 'Help', link: '/help',icon: 'bi bi-person' }
  ];

  bandeja = this.menuItems[0]; 
  correspondencia = this.menuItems[1]; 
  control = this.menuItems[2];
//   services = this.menuItems[2];
//   contact = this.menuItems[3];
//   help = this.menuItems[4];

  

  constructor() { }

  ngOnInit(): void {
    // Obtén los elementos de manera segura
    const hamBurger = document.querySelector('.toggle-btn') as HTMLElement | null;
    const sidebar = document.querySelector('#sidebar') as HTMLElement | null;

    // Asegúrate de que los elementos existan
    if (!hamBurger || !sidebar) {
        console.error('No se pudieron encontrar los elementos necesarios.');
        return;
    }

    // Inicialmente, el sidebar estará expandido
    sidebar.classList.remove('collapsed');

    // Variable para controlar el estado del sidebar
    let isSidebarCollapsed = false;

    // Escucha de clic solo en el botón toggle
    hamBurger.addEventListener('click', () => {
        // Alterna la clase 'collapsed' y actualiza el estado del sidebar
        isSidebarCollapsed = !isSidebarCollapsed;
        if (isSidebarCollapsed) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    });

    // Prevenir que el sidebar se contraiga al hacer clic en cualquier parte del documento
    document.addEventListener('click', (event) => {
        // Verifica que el clic no fue en el sidebar ni en el botón toggle
        if (sidebar && hamBurger && !sidebar.contains(event.target as Node) && !hamBurger.contains(event.target as Node)) {
            // Solo contraer el sidebar si está expandido
            if (!isSidebarCollapsed) {
                isSidebarCollapsed = true;
                sidebar.classList.add('collapsed');
            }
        }
    });
}


  }
  

