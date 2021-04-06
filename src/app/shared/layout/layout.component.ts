import { Component, OnInit } from '@angular/core';
import { CatalogStatusService } from 'src/app/core/services/catalog-status.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  constructor(private servicioCatalog: CatalogStatusService) { }

  ngOnInit() {
    this.servicioCatalog.getInformation();
  }

}
