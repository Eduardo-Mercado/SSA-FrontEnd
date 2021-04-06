import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CatalogStatus } from '../models/catalogStatus.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogStatusService {

  catalogStauts: CatalogStatus[] = [];

  private readonly url = environment.baseURL + '/DropDown';
  constructor(private http: HttpClient) { }

  getInformation(){
    this.http.get(this.url + '/getCatalogwithColor').subscribe((data: any) => this.catalogStauts = data);
  }

  getColorByName(name: string) {
     if (this.catalogStauts.length === 0) {
       this.getInformation();
     }

     const valor = this.catalogStauts.filter(x => x.name === name).map(data => data.color)[0];
     return valor;
  }
}
