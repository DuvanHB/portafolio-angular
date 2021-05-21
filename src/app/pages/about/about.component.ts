import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  integrantes: any[] = [];
  constructor(public infoPaginaService: InfoPaginaService) {
    this.integrantes = this.infoPaginaService.equipo;
  }

  ngOnInit(): void {
  }

}
