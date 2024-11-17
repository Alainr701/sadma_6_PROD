
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import Swal from 'sweetalert2';
export interface HojaDeRutaReport {
  id_hoja_de_ruta: number;
  codigo_interno: string;
  estado: string;
  fec_cre: Date;
  obs: string;
  cite: string;
  nombre_completo: string;
}
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  VIDEOGAMES: HojaDeRutaReport[] = [];
  constructor(private correspondenciaService: CorrespondenciaService) { }
 async ngOnInit() {
  
    
  }
  name = '';
  async getData(){
    let data = JSON.parse(sessionStorage.getItem('userData') || 'null');
    this.name = data.nombres + ' ' + data.apellidos;
    

    let body= {
      id_personas: data.id_personas,
      fecha_inicio:this.fechaInicio,
      fecha_fin:this.fechaFin
    }
    let res = await this.correspondenciaService.obtenerReporte(body);
    this.VIDEOGAMES = res.data;
  }
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlDatas')!;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      const newWindow = window.open('', '_blank');
      newWindow!.document.write(`<title>Reporte de Correspondencia</title>`);
      newWindow!.document.write(`<embed width="100%" height="100%" type="application/pdf" src="${URL.createObjectURL(docResult.output('blob'))}">`);
    });
  }
  fechaInicio = '';
  fechaFin='';
  // tslint:disable-next-line:typedef
  async generarReporte(fechaInicio: string, fechaFin: string) {

    await this.getData();
    Swal.fire({
      title: 'Reporte Generado',
      text: 'El reporte ha sido generado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
     
  }
  limpiar() {
    this.VIDEOGAMES = [];
    this.fechaInicio = '';
    this.fechaFin = '';
  }

}
