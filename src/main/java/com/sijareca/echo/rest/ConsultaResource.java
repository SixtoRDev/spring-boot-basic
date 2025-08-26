package com.sijareca.echo.rest;

import com.sijareca.echo.model.ConsultaDTO;
import com.sijareca.echo.service.ConsultaService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/consultas", produces = MediaType.APPLICATION_JSON_VALUE)
public class ConsultaResource {

    private final ConsultaService consultaService;

    public ConsultaResource(final ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping
    public ResponseEntity<List<ConsultaDTO>> getAllConsultas() {
        return ResponseEntity.ok(consultaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultaDTO> getConsulta(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(consultaService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createConsulta(@RequestBody @Valid final ConsultaDTO consultaDTO) {
        final Long createdId = consultaService.create(consultaDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateConsulta(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final ConsultaDTO consultaDTO) {
        consultaService.update(id, consultaDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteConsulta(@PathVariable(name = "id") final Long id) {
        consultaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
