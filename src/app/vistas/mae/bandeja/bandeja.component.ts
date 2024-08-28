import { Component } from '@angular/core';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.css']
})
export class BandejaComponent {
  selectedEntries: number = 10;
  entriesOptions: number[] = [10, 25, 50, 100];

  onEntriesChange(event: any) {
    console.log('Selected entries:', this.selectedEntries);
  }}
