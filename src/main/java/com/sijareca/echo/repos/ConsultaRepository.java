package com.sijareca.echo.repos;

import com.sijareca.echo.domain.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    boolean existsByTokenIgnoreCase(String token);

    boolean existsByOrigenIgnoreCase(String origen);

}
