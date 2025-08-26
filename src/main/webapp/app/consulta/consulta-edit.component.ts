import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ConsultaService } from 'app/consulta/consulta.service';
import { ConsultaDTO } from 'app/consulta/consulta.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-consulta-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './consulta-edit.component.html'
})
export class ConsultaEditComponent implements OnInit {

  consultaService = inject(ConsultaService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentId?: number;

  editForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    token: new FormControl(null, [Validators.required, Validators.maxLength(1024)]),
    origen: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    timestamp: new FormControl(null),
    mensaje: new FormControl(null),
    respuesta: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@consulta.update.success:Consulta was updated successfully.`,
      CONSULTA_TOKEN_UNIQUE: $localize`:@@Exists.consulta.token:This Token is already taken.`,
      CONSULTA_ORIGEN_UNIQUE: $localize`:@@Exists.consulta.origen:This Origen is already taken.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.params['id'];
    this.consultaService.getConsulta(this.currentId!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new ConsultaDTO(this.editForm.value);
    this.consultaService.updateConsulta(this.currentId!, data)
        .subscribe({
          next: () => this.router.navigate(['/consultas'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
