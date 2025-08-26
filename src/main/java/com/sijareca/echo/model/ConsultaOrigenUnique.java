package com.sijareca.echo.model;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;

import com.sijareca.echo.service.ConsultaService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Map;
import org.springframework.web.servlet.HandlerMapping;


/**
 * Validate that the origen value isn't taken yet.
 */
@Target({ FIELD, METHOD, ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(
        validatedBy = ConsultaOrigenUnique.ConsultaOrigenUniqueValidator.class
)
public @interface ConsultaOrigenUnique {

    String message() default "{Exists.consulta.origen}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    class ConsultaOrigenUniqueValidator implements ConstraintValidator<ConsultaOrigenUnique, String> {

        private final ConsultaService consultaService;
        private final HttpServletRequest request;

        public ConsultaOrigenUniqueValidator(final ConsultaService consultaService,
                final HttpServletRequest request) {
            this.consultaService = consultaService;
            this.request = request;
        }

        @Override
        public boolean isValid(final String value, final ConstraintValidatorContext cvContext) {
            if (value == null) {
                // no value present
                return true;
            }
            @SuppressWarnings("unchecked") final Map<String, String> pathVariables =
                    ((Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE));
            final String currentId = pathVariables.get("id");
            if (currentId != null && value.equalsIgnoreCase(consultaService.get(Long.parseLong(currentId)).getOrigen())) {
                // value hasn't changed
                return true;
            }
            return !consultaService.origenExists(value);
        }

    }

}
