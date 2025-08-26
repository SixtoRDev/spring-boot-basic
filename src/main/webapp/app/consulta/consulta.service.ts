import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ConsultaDTO } from 'app/consulta/consulta.model';


@Injectable({
  providedIn: 'root',
})
export class ConsultaService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/consultas';

  getAllConsultas() {
    return this.http.get<ConsultaDTO[]>(this.resourcePath);
  }

  getConsulta(id: number) {
    return this.http.get<ConsultaDTO>(this.resourcePath + '/' + id);
  }

  createConsulta(consultaDTO: ConsultaDTO) {
    return this.http.post<number>(this.resourcePath, consultaDTO);
  }

  updateConsulta(id: number, consultaDTO: ConsultaDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, consultaDTO);
  }

  deleteConsulta(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

}
