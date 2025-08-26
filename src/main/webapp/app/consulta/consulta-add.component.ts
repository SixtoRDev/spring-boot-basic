import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ConsultaService } from 'app/consulta/consulta.service';
import { ConsultaDTO } from 'app/consulta/consulta.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-consulta-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './consulta-add.component.html'
})
export class ConsultaAddComponent {

  consultaService = inject(ConsultaService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    token: new FormControl(null, [Validators.required, Validators.maxLength(1024)]),
    origen: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    timestamp: new FormControl(null),
    mensaje: new FormControl(null),
    respuesta: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@consulta.create.success:Consulta was created successfully.`,
      CONSULTA_TOKEN_UNIQUE: $localize`:@@Exists.consulta.token:This Token is already taken.`,
      CONSULTA_ORIGEN_UNIQUE: $localize`:@@Exists.consulta.origen:This Origen is already taken.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new ConsultaDTO(this.addForm.value);
    this.consultaService.createConsulta(data)
        .subscribe({
          next: () => this.router.navigate(['/consultas'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
