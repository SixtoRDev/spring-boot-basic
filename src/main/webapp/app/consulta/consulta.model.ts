export class ConsultaDTO {

  constructor(data:Partial<ConsultaDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  token?: string|null;
  origen?: string|null;
  timestamp?: string|null;
  mensaje?: string|null;
  respuesta?: string|null;

}
